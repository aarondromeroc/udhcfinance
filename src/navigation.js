function navigation() {

    if (window.innerWidth > 991) {
        // Menu interaction setup
        let duration = 400;
        let menuLink = $(".nav_link");
        let currentLink = $(".nav_link.w--current");
        let menuShape = $(".menu-shape");
        let menuShapeBG = $(".menu-shape_bg");
        let menu = $(".nav_links-wrapper");
      
        menuLink.on("click", function (e) {
          menuShapeBG.css("transition", "width 200ms");
          menuShape.css("transition", "all 400ms");
          moveShape($(this));
        });
      
        function moveShape(target) {
          let linkWidth = target.innerWidth();
          let linkOffset = target.offset().left;
          let menuOffset = menu.offset().left;
          let leftPosition = linkOffset - menuOffset;
          menuShape.css({
            width: linkWidth,
            left: leftPosition,
          });
        }
      
        moveShape(currentLink);
        $(".nav_link-bg").css("opacity", 0);
        menuShape.css("opacity", 1);
      
        window.addEventListener("resize", function () {
          moveShape(currentLink);
        });
      }
  }

  function brandClick() {
    const homeButton = $('[href="/home"]');
    const brand = $('.brand');

    if (homeButton.length > 0) {
        brand.on('click', (event) => {
            event.preventDefault(); // Prevents the default behavior of the anchor link
            homeButton.click();
        });
    } else {
        console.error('Home button not found!');
    }
}

  export { navigation, brandClick }