<?php
    $ssrHtml = \App\fetch_ssr_component();
?>

<!doctype html>
<html <?php language_attributes(); ?>>
    <?php get_template_part('partials/head'); ?>
    <body <?php body_class(); ?>>
        <?= $ssrHtml ?>
        <?php wp_footer(); ?>
    </body>
</html>
