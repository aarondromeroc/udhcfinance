import Swiper from "swiper";
import { Navigation, Keyboard, Mousewheel } from "swiper/modules";
import { gsap } from "gsap";
import './styles/style.css'


function team() {
    function teamSwiper() {
    
        const swiper = new Swiper(".swiper", {
            modules: [Navigation, Keyboard, Mousewheel],
            slidesPerView: 1.25,
            centeredSlides: true,
            spaceBetween: 20,
            slideToClickedSlide: true,
            mousewheel: {
                forceToAxis: true,
              },
              keyboard: {
                enabled: true,
                onlyInViewport: false,
              },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl  : '.swiper-button-prev'
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 40
                }
            }
        })
    
    }

    teamSwiper();
    
    function teamBio(teamMember) {
        let bioTl = gsap.timeline({
            paused: true,
        });
    
        let bioModal = $('.team_card-bio-wrapper[data-team-member="' + teamMember + '"]');
        let mask = bioModal.find('.team_card-bio-mask');
        let closeBtn = bioModal.find('.bio_close');
        let page = $('.page-wrapper')
    
        bioTl.set(bioModal, { display: 'flex' });
        bioTl.from(mask, {
            xPercent: 100,
            duration: 0.8,
            ease: 'power2.out'
        });
    
        const bioTrigger = $('.team_card-wrapper[data-team-member="' + teamMember + '"]').find('.btn.cc--bio');
        bioTrigger.on('click', () => {
            page.css('z-index', 99);
            bioTl.restart().play();
        });
    
        closeBtn.on('click', () => {
            bioTl.timeScale(1.5);
            bioTl.reverse();
            setTimeout(() => {
                page.css('z-index', 2);
            }, 1500);
        });
    }
    
    // Usage for each team_card-wrapper
    $(".team_card-wrapper").each(function () {
        const teamMember = $(this).attr('data-team-member');
        teamBio(teamMember);
    });
}

export { team }