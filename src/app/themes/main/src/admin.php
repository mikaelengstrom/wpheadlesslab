<?php

namespace App;

/**
 * Change admin bar "Edit" link title to not include post type name (page/post/cpt, i.e. "Edit Recipe")
 * (mainly to not confuse users as the edit link itself is updated from the React front-end)
 */

add_action( 'admin_bar_menu', function($wp_admin_bar) {
    $edit_node = $wp_admin_bar->get_node('edit');
    if($edit_node) {
        $wp_admin_bar->remove_node('edit');
        $edit_node->title = 'Edit';
        $wp_admin_bar->add_node($edit_node);
    }
}, 999);
