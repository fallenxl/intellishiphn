import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

export function playAnimation() {
  let initPageRef = document.querySelector(".animation-container");
  let bgTransitionRef = document.querySelector(".bg-transition");
  let logoBars = gsap.utils.toArray(".logo-bar");
  const heroButton = document.querySelectorAll(".hero-button");

  const tl = gsap.timeline({});

  logoBars.forEach((bar, index) => {
    tl.set(bar, { fill: "#00ccd3" });
  });

  const splitText = new SplitText(".hero-text-split", {
    type: "lines, words, chars",
  });
  const chars = splitText.words;

  if (initPageRef) {
    tl.to(initPageRef, {
      duration: 1,
      ease: "power3.out",
      delay: 0.5,

    })
     
      .to(bgTransitionRef, {
        duration: 1,
        transformOrigin: "bottom center",
        scaleY: 1,
        backgroundColor: "#00ccd3",
        ease: "power3.out",
      })
       .to(
        logoBars,
        {
          fill: "white",
          duration: 0.2,
    
        },  
        "<"
      )
      .to(initPageRef, {
        duration: 1,
        opacity: 0,
        ease: "power3.out",
        onComplete: () => {
          if (initPageRef) {

            initPageRef.style.display = "none";
            
          }
        },
      });

    tl.set(logoBars, { fill: "#46d9e3" } , "<");
    if (heroButton.length > 0 && chars.length > 0) {
      tl.from(
        chars,
        {
          duration: 0.6,
          opacity: 0,
          y: 40,
          stagger: 0.1,
          ease: "power3.out",
        },
        "<"
      )
      heroButton.forEach((button) => {
        tl.fromTo(
          button,
        {
          duration: 1,
          opacity: 0,
          ease: "power2.Out",
        },
        {
          duration: 1,
          opacity: 1,
          ease: "power2.Out",
        },
        "<"
      );
      })
      
    }
  }
}
