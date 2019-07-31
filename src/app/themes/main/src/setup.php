<?php

namespace App;

use Roots\Sage\Template;

/**
 * Theme assets
 */
add_action('wp_enqueue_scripts', function () {
    $themeVersion = wp_get_theme()->get('Version');
    $verTag = WP_ENV == 'production' ? md5($themeVersion) : $themeVersion;

    wp_register_script('react/dist.js', asset_path('client/client.js'));
    wp_localize_script('react/dist.js', '__FROJD_SETTINGS', [
        'appBase' => WP_HOME,
        'wpHome' => WP_HOME,
        'wpLoggedIn' => is_user_logged_in(),
        'wpRestNonce' => is_user_logged_in()
            ? wp_create_nonce('wp_rest')
            : null,
        'repressVersion' => $themeVersion
    ]);
    wp_enqueue_script('react/dist.js', asset_path('client/client.js'), '', $verTag, true);

    wp_enqueue_style('react/main-styles', asset_path('client/client.css'), false, $verTag);
}, 100);


/**
 * Theme setup
 */
add_action('after_setup_theme', function () {
    /**
     * Register navigation menus
     * @link http://codex.wordpress.org/Function_Reference/register_nav_menus
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage')
    ]);

    /**
     * Enable post thumbnails
     * @link http://codex.wordpress.org/Post_Thumbnails
     * @link http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
     * @link http://codex.wordpress.org/Function_Reference/add_image_size
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable HTML5 markup support
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
     */
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

    /**
     * Use main stylesheet for visual editor
     * @see assets/styles/layouts/_tinymce.scss
     */
    // add_editor_style(asset_path('styles/editor.css'));

    /**
     * Localize
     */
    load_theme_textdomain('sage', get_template_directory() . '/lang' );
});

/**
 * Purge nginx cache on option update
 */
add_action('updated_option', function() {
    if(class_exists('NginxCache')) {
        $nginx = new \NginxCache;
        $nginx->purge_zone_once();
    }
});

/*
 * Disable Gutenberg editor
 */

// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);
// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);

add_action( 'wp_enqueue_scripts', function() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
}, 100);


/**
 * Disable wp redirects
 * (interferes with react client side routing)
 */

remove_filter('template_redirect','redirect_canonical');
