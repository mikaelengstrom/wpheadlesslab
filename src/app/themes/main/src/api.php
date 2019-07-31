<?php

namespace App;

use Roots\Sage\Template;

/**
 * Register dynamic routes endpoint: /wp-json/routes/v1/all
 *
 * Calls to this endpoint will return all permalinks/routes of all pages/posts/cpt's and
 * their corresponding template/component as set in wp-admin
 */

add_action('rest_api_init', function () {
    register_rest_route('router/v1', 'all', array(
        'methods'  => \WP_REST_Server::READABLE,
        'callback' => function(\WP_REST_Request $request) {
            $query = new \WP_Query([
                'posts_per_page' => -1,
                'post_type' => array_merge(
                    ['post', 'page'],
                    get_public_post_types()
                )
            ]);

            $pages = array_map(function($page) {
                $template_file = get_post_meta($page->ID, '_wp_page_template', true);

                if($template_file === '' && $page->post_type === 'post') {
                    $template_file = 'templates/single-post.php';
                }

                if($template_file === '' || $template_file === 'default'
                    && $page->post_type === 'page')
                {
                    $template_file = 'templates/page.php';
                }

                if($page->post_type !== 'post' && $page->post_type !== 'page') {
                    $template_file = 'templates/single-' . $page->post_type . '.php';
                }

                $template = locate_template($template_file);
                $component = '';

                if($template) {
                    $data = get_file_data($template, ['Name' => 'Template Name']);
                    $component = $data['Name'];
                }

                $url = str_replace(WP_HOME, '', get_permalink($page->ID));

                return [
                    'id' => $page->ID,
                    'base' => WP_HOME,
                    'url' => $url,
                    'post_type' => $page->post_type,
                    'template' => $template_file,
                    'component' => $component
                ];

            }, $query->posts);

            return $pages;
        }
    ));
});

/**
 * Include acf fields for all registered post types in rest api responses
 */
add_action('rest_api_init', function() {
    // get all post types
    global $wp_post_types;
    $post_types = array_keys($wp_post_types);

    foreach ($post_types as $post_type) {
        add_filter('rest_prepare_'.$post_type, function($data, $post, $request) {
            // get the response data
            $response_data = $data->get_data();

            // bail early if there's an error
            if($request['context'] !== 'view' || is_wp_error( $data )) {
                return $data;
            }

            // get all fields
            $fields = get_fields($post->ID);

            // set data if we have fields
            if ($fields){
                foreach ($fields as $field_name => $value){
                    $response_data[$field_name] = $value;
                }
            }

            // commit the API result var to the API endpoint
            $data->set_data($response_data);

            return $data;
        }, 10, 3);
    }
}, 99);


/**
 * Include acf fields for all registered taxonomies in rest api responses
 */
add_action('rest_api_init', function(){
    $taxonomies = array_keys(get_taxonomies());

    foreach ($taxonomies as $taxonomy) {
        add_filter( 'rest_prepare_'.$taxonomy, function($data, $term, $request){
            $response_data = $data->get_data();

            if ($request['context'] !== 'view' || is_wp_error( $data )) {
                return $data;
            }

            //Get all fields
            $fields = get_fields('term_'.$term->term_id);

            if ($fields){
                foreach($fields as $field_name => $value) {
                    $response_data[$field_name] = $value;
                }
            }

            // commit the API result var to the API endpoint
            $data->set_data($response_data);
            return $data;
        }, 10, 3);
    }
}, 99);

/**
 * Test endpoint - returns current date
 */
add_action('rest_api_init', function ($server) {
    $server->register_route( 'date', '/date', array(
        'methods'  => 'GET',
        'callback' => function () {
            return [
                'date' => date('Y-m-d')
            ];
        },
    ));
});

/**
 * Surface all Gutenberg blocks in the WordPress REST API
 */

// add_action('rest_api_init', function() {
// 	$post_types = get_post_types_by_support( [ 'editor' ] );
// 	foreach ( $post_types as $post_type ) {
// 		if ( gutenberg_can_edit_post_type( $post_type ) ) {
// 			register_rest_field( $post_type, 'blocks', [
// 				'get_callback' => function ( array $post ) {
// 					return gutenberg_parse_blocks( $post['content']['raw'] );
// 				}
// 			] );
// 		}
// 	}
// });
