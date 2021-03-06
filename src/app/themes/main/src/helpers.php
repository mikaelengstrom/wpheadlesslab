<?php

namespace App;

use Roots\Sage\Asset;
use Roots\Sage\Assets\JsonManifest;
use Roots\Sage\Template;

/**
 * Fetch rendered React component for current route, or return container html
 * if ssr is not available
 * @return string
 */
function fetch_ssr_component() {
    $container_html = '<div id="root"></div>';
    $has_preview_query = strpos($_SERVER['REQUEST_URI'], '?') !== false
        && isset($_GET['preview']);

    // don't do ssr for wp post previews (for simplicity's sake)

    if($has_preview_query) {
        return $container_html;
    }

    try {
        $url = WP_SSR_HOST . $_SERVER['REQUEST_URI'];
        $client = new \GuzzleHttp\Client();

        $resp = $client->request('GET', $url, ['allow_redirects' => false]);

        // if react-router triggered a redirect,
        // the ssr server will trigger a http redirect in turn.
        //
        // we'll propagate that manually in order to keep urls/headers/wp plugins
        // in sync with the current req url instead of allowing Guzzle to follow it automatically

        $respStatus = $resp->getStatusCode();
        if($respStatus == 301 || $respStatus == 302) {
            $location = WP_HOME . $resp->getHeader('location')[0];
            header("Location: {$location}");
            die;
        }

        $ssr_html = $resp->getBody();
        return $ssr_html;

    } catch (\GuzzleHttp\Exception\BadResponseException $e) {
        return $container_html;
    } catch(\GuzzleHttp\Exception\ConnectException $e) {
        return $container_html;
    }
}

/**
 * Get all public post types (including cpt's)
 * @return array()
 */
function get_public_post_types() {
    $args = array(
        'public'   => true,
        '_builtin' => false
    );

    $output = 'names'; // 'names' or 'objects' (default: 'names')
    $operator = 'and'; // 'and' or 'or' (default: 'and')

    $post_types = get_post_types($args, $output, $operator);

    return array_keys($post_types);
}

/**
 * @param $filename
 * @return string
 */
function asset_path($filename) {
    static $manifest;
    isset($manifest) || $manifest = new JsonManifest(get_template_directory() . '/' . Asset::$dist . '/assets.json');

    return (string)new Asset($filename, $manifest);
}

// /**
//  * Determine whether to show the sidebar
//  * @return bool
//  */
// function display_sidebar() {
//     static $display;
//     isset($display) || $display = apply_filters('sage/display_sidebar', true);
//     return $display;
// }

// /**
//  * Page titles
//  * @return string
//  */
// function title() {
//     if (is_home()) {
//         if ($home = get_option('page_for_posts', true)) {
//             return get_the_title($home);
//         }
//         return __('Latest Posts', 'sage');
//     }
//     if (is_archive()) {
//         return get_the_archive_title();
//     }
//     if (is_search()) {
//         return sprintf(__('Search Results for %s', 'sage'), get_search_query());
//     }
//     if (is_404()) {
//         return get_field('404_title', 'option');
//     }
//     return get_the_title();
// }

// /**
//  * Get a field as object when it is a repeater field with a single row
//  */
// function get_field_group($field = '', $postId = null) {
//     $postId = is_null($postId) ? get_the_ID() : $postId;
//     $group = get_field($field, $postId);

//     if($group)
//         return current($group);
//     return false;
// }

// /**
//  * SVG icons
//  */
// function the_svg_icon($icon, $relPath = '/dist/images/') {
//     echo get_the_svg_icon($icon, $relPath);
// }

// function get_the_svg_icon($icon, $relPath = '/dist/images/') {
//     $icon = preg_replace('/\.svg$/', '', $icon);

//     $path = get_template_directory() . $relPath . $icon . '.svg';
//     if(file_exists($path)) {
//         return preg_replace( "/\r|\n/", "", trim(file_get_contents($path)));
//     }
//     return '';
// }

// /**
//  * Post thumbnail as background image
//  */
// function the_post_thumbnail_background($size = '', $postId = null, $thumbnailId = null) {
//     $thumbnail = get_post_thumbnail_data($size, $postId, $thumbnailId);

//     if(empty($thumbnail->src)) {
//         return '';
//     }

//     $html = ' style="background-image:url(\'' . $thumbnail->src . '\');"';
//     if(!empty($thumbnail->alt)) {
//         $html .= ' title="' . $thumbnail->alt . '"';
//     }
//     echo $html;
// }

// function get_post_thumbnail_data($size = '', $postId = null, $thumbnailId = null) {
//     $size = empty($size) ? 'thumbnail' : $size;
//     $postId = is_null($postId) ? get_the_ID() : $postId;
//     $thumbnailId = is_null($thumbnailId) ? get_post_thumbnail_id($postId) : $thumbnailId;

//     $attachment = get_post($thumbnailId);
//     $src = wp_get_attachment_image_src($thumbnailId, $size);
//     return (object) array(
//         'title' => $attachment->post_title,
//         'caption' => $attachment->post_excerpt,
//         'description' => $attachment->post_content,
//         'src' => !empty($src) ? $src[0] : '',
//         'alt' => trim(strip_tags(get_post_meta($thumbnailId, '_wp_attachment_image_alt', true)))
//     );
// }

function template($layout = 'base') {
    return Template::$instances[$layout];
}

function template_part($template, array $context = [], $layout = 'base') {
    extract($context);
    include template($layout)->partial($template);
}
