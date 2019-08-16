<?php

function register_recipe_categories() {

    $single = _x('Recipe category', 'Taxonomy single string', 'sage');
    $plural = _x('Recipe categories', 'Taxonomy plural string', 'sage');
    $labels = taxonomy_labels($single, $plural);

    $args = array(
        'labels' => $labels,
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_admin_column' => false,
        'show_in_nav_menus' => false,
        'show_in_rest' => true,
        'query_var' => true,
        'show_tagcloud' => false,
    );

    register_taxonomy('recipe_category', array('recipe'), $args);
}

add_action('init', 'register_recipe_categories', 0);
