<!doctype html>
<html <?php language_attributes(); ?>>
    <?php get_template_part('partials/head'); ?>

    <body <?php body_class(); ?>>
        <?php // do_action('get_header'); ?>

        <?= \App\fetch_ssr_component() ?>

        <?php
            wp_footer();
              // do_action('get_footer');
        ?>
    </body>
</html>
