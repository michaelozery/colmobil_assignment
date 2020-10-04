<?php $items = get_query_var('post_items'); ?>

<div class="swiper-container">
  <div class="swiper-wrapper">
    <?php while ($items->have_posts()) {
      $items->the_post(); ?>
      <div class="swiper-slide">
        <div class="slide-background-image" style="background-image: url(<?php echo get_the_post_thumbnail_url(); ?>)">
          <div class="slide-text-box-desktop">
            <h2 class="slide-title"><?php the_title(); ?></h2>
            <p class="slide-content">
              <?php if (has_excerpt()) {
                $excerpt = get_the_excerpt();
              } else $excerpt = wp_trim_words(get_the_content(), 24);
              echo $excerpt; ?> <a href="<?php the_permalink(); ?>">לעמוד הדגם</a>
            </p>
          </div>
        </div>
        <div class="slide-text-box">
          <h2 class="slide-title"><?php the_title(); ?></h2>
          <p class="slide-content">
            <?php if (has_excerpt()) {
              $excerpt = get_the_excerpt();
            } else $excerpt = wp_trim_words(get_the_content(), 36);
            echo $excerpt; ?><a href="<?php the_permalink(); ?>">לעמוד הדגם</a></p>
        </div>
      </div>

    <?php } ?>
  </div>
  <button class="pause-btn btn btn-dark">
    <svg width="4rem" height="4rem" viewBox="0 0 16 16" class="bi bi-pause-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
    </svg>
  </button>
  <div class="swiper-pagination">
  </div>

  <div class="pagination-labels" style="display: none;">
    <?php while ($items->have_posts()) {
      $items->the_post(); ?>
      <span><?php the_title(); ?></span>
    <?php  } ?>
  </div>
</div>