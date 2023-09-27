// Added Locomotive scrolling for smooth scrolling
function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
loco();


var tl = gsap.timeline();
tl.to("#nav svg", {
    height: "20px",
    opacity: 1,
    scale: 1,
    // height:"60px",
    duration: 1,
})
tl.to("#nav", {
    height: "60px",
    duration: 1,
}, "ani")
.to("#nav h1", {
    scale: 1,
    duration: 1,
    opacity: 1
}, "ani").from("#text svg",{
    x:`100%`,
    opacity:0,
    duration:1
}).to("#part1 img",{
    transform: "translateX(0%)",
})
gsap.set("#text svg",{
    transform: "translateX(0%)",
})
gsap.set("#part1 img",{
    transform: "translateY(100%)",
})

var tl2 = gsap.timeline({
    scrollTrigger: {
        start: "top 5%",
        end: "top -200%",
        scroller: "#main",
        trigger: "#text",
        pin: true,
        scrub: .8,
        markers: true
    }
});

tl2.to("#text svg", {
    transform: "translateX(-100%)",
    duration: 50

}).to("#text",{
    display:none
})