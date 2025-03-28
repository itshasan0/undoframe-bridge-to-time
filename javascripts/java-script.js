document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");
    const button1 = document.getElementById("button1");
    const firstScreen = document.querySelector(".screen_one");
    const thirdScreen = document.querySelector(".third_screen");
    const images = document.querySelectorAll('.age_img');
    const arrow = document.querySelector(".arrow"); 
    const elips = document.querySelector(".elips"); 
    const secScreen = document.querySelector(".second_screen"); 
    const houseButton = document.querySelector(".house_container"); 
    const triangles = document.querySelector(".triangles"); 
    const m = document.querySelector('.m');
    const r = document.querySelector('.r');
    const i = document.querySelector('.i');
    const e = document.querySelector('.e2');

    let index = 0;
    let isThirdScreenVisible = false;
    let animationTimeouts = [];
     
    const texts = [
        {
            element: document.getElementById('min_left_text'),
            text: "Our platform redefines the concept of time through preserving and reinterpreting memories. It is based on the idea that memories not only capture the past but can also serve as a means to regain lost time or even travel to the past and future."
        },
        {
            element: document.getElementById('min_right_text'),
            text: "Through dynamic typography, visual storytelling, and interactive navigation, users can revisit past moments, revive forgotten emotions, and explore personal experiences. The platform also offers the chance to shape the future through memories, where time becomes a stream, not just a path."
        }
    ];

    async function typeWriter(textObj) {
        textObj.element.textContent = '';
        for (let i = 0; i < textObj.text.length; i++) {
            textObj.element.textContent += textObj.text[i];
            await new Promise(function(resolve) {
                setTimeout(resolve, 50);
            }); 
        }
        await new Promise(function(resolve) {
            setTimeout(resolve, 2000);
        }); 
        requestAnimationFrame(function() {
            typeWriter(textObj);
        }); 
    }

    texts.forEach(function(textObj) {
        typeWriter(textObj);
    });

    const numRectangles = 6;
    
    for (let i = 0; i < numRectangles; i++) {
        let rect = document.createElement("div");
        rect.classList.add("rectangle");
        let size = 10 + i * 5;
        rect.style.width = size + 'vw';
        rect.style.height = (size * 0.75) + 'vw';
        rect.style.animation = 'rotate 4s linear infinite';
        rect.style.animationDelay = (i * 0.2) + 's';
        rect.style.borderColor = 'white';
        container.appendChild(rect);
    }

    let angle = 0;
    function animate() {
        angle += 1;
        document.querySelectorAll(".rectangle").forEach(function(rect, index) {
            let direction = index % 2 === 0 ? 1 : -1;
            rect.style.transform = 'translate(-50%, -50%) rotate(' + (angle * direction) + 'deg)';
        });
        requestAnimationFrame(animate);
    }
    animate(); 

    button1.addEventListener("click", function() {
        firstScreen.style.display = "none";
        thirdScreen.style.display = "none";
        secScreen.style.display = "block"; 
        updateScreenVisibility();
    });

    function morphImages() {
        images.forEach(function(img) {
            img.classList.remove('active');
        }); 
        images[index].classList.add('active'); 
        index = (index + 1) % images.length; 
    }

    setInterval(morphImages, 3000);

    elips.addEventListener("click", function() {
        setTimeout(function() {
            arrow.style.transition = "transform 1s ease-in-out";
            arrow.style.transform = "rotate(360deg)";
        }, 10);

        setTimeout(function() {
            secScreen.style.display = "none";
            thirdScreen.style.display = "block";
            updateScreenVisibility();
        }, 1000); 
    });

    houseButton.addEventListener("click", function() {
        thirdScreen.style.display = "none";
        secScreen.style.display = "none"; 
        firstScreen.style.display = "block"; 
        updateScreenVisibility();
    });

    document.addEventListener("mousemove", function(e) {
        const arrow1 = document.querySelector(".arrow_red1");
        const arrow2 = document.querySelector(".arrow_red2");

        if (!arrow1 || !arrow2) return;

        const arrowContainer = document.querySelector(".arrow_red");
        const rect = arrowContainer.getBoundingClientRect();
        
        const arrowX = rect.left + rect.width / 2;
        const arrowY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - arrowY, e.clientX - arrowX) * (180 / Math.PI);

        arrow1.style.transform = "rotate(" + angle + "deg)";
        arrow2.style.transform = "rotate(" + angle + "deg)";
    });

    const arms = document.querySelector(".arms_move");

    document.addEventListener("mousemove", function(e) {
        let moveAmount = (e.clientX / window.innerWidth - 0.5) * 20;
        arms.style.transform = "rotate(" + moveAmount + "deg)";
    });

    triangles.addEventListener('click', function() {
        this.classList.toggle('zoomed');
    });

    function stopColorAnimation() {
        animationTimeouts.forEach(clearTimeout);
        animationTimeouts = [];
    }

    function resetColorAnimation() {
        if (m) m.style.backgroundColor = '';
        if (r) r.style.backgroundColor = '';
        if (i) i.style.backgroundColor = '';
        if (e) e.style.backgroundColor = '';
    }

    function startColorAnimation() {
        stopColorAnimation();
        resetColorAnimation();
        if (!isThirdScreenVisible) return;

        const timeout1 = setTimeout(() => {
            if (!isThirdScreenVisible) return;
            if (m) m.style.backgroundColor = '#FF0000';

            const timeout2 = setTimeout(() => {
                if (!isThirdScreenVisible) return;
                if (r) r.style.backgroundColor = '#FFFFFF';

                const timeout3 = setTimeout(() => {
                    if (!isThirdScreenVisible) return;
                    if (i) i.style.backgroundColor = '#FF0000';

                    const timeout4 = setTimeout(() => {
                        if (!isThirdScreenVisible) return;
                        if (e) e.style.backgroundColor = '#FF0000';
                    }, 1000);
                    animationTimeouts.push(timeout4);
                }, 1000);
                animationTimeouts.push(timeout3);
            }, 1000);
            animationTimeouts.push(timeout2);
        }, 2500);
        animationTimeouts.push(timeout1);
    }

    function updateScreenVisibility() {
        const newVisibility = thirdScreen.style.display !== 'none';
        if (newVisibility !== isThirdScreenVisible) {
            isThirdScreenVisible = newVisibility;
            if (isThirdScreenVisible) {
                startColorAnimation();
            } else {
                stopColorAnimation();
                resetColorAnimation();
            }
        }
    }

    const observer = new MutationObserver(updateScreenVisibility);
    observer.observe(thirdScreen, { attributes: true, attributeFilter: ['style'] });

    
});