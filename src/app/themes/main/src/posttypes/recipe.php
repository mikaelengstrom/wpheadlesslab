<?php

function register_recipe() {

    $single = _x('Recipe', 'Post type single string', 'sage');
    $plural = _x('Recipes', 'Post type plural string', 'sage');
    $labels = post_type_labels($single, $plural);

    $args = array(
        'label' => __('Recipe', 'sage'),
        'description' => __('Recipe person', 'sage'),
        'labels' => $labels,
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'revisions',),
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'public' => true,
        'show_in_rest' => true,
        'can_export' => true,
        'has_archive' => false,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'page',
        'menu_icon' => 'dashicons-id-alt',
    );

    register_post_type('recipe', $args);

}

add_action('init', 'register_recipe', 0);
