<?php
get_header();
?>

<main id="site-content" role="main">
    <?php $carPosts = new WP_Query(array(
        'post_type' => 'car'
    ));
    set_query_var('post_items', $carPosts);
    get_template_part('/template-parts/carousel');
    ?>
</main>

<?php get_footer(); ?>