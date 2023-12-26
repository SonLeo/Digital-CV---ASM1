document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navlink");

    function changeNavLink() {
        const currentSectionId = getCurrentSectionId();
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    }

    function getCurrentSectionId() {
        let currentSectionId = "";
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            console.log(rect)
            if (rect.top <= 0 || rect.bottom <= window.innerHeight) {
                currentSectionId = section.id;
            }
        });
        return currentSectionId;
    }

    window.addEventListener("scroll", changeNavLink);
    changeNavLink();

    const slideWrapper = document.querySelector(".slide-wraper");
    const slides = document.querySelectorAll(".slide-item");
    const slideWidth = slides[0].offsetWidth;
    let totalSlides = slides.length;
    let currentIndex = 0;

    let maxParagraphHeight = 0;
    slides.forEach(slide => {
        const paragraphHeight = slide.querySelector('p').offsetHeight;
        maxParagraphHeight = Math.max(maxParagraphHeight, paragraphHeight);
    });

    slides.forEach(slide => {
        slide.querySelector('p').style.minHeight = `${maxParagraphHeight}px`;
    });

    const firstClone = slides[0].cloneNode(true);
    const secondClone = slides[1].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    slideWrapper.appendChild(firstClone);
    slideWrapper.appendChild(secondClone);
    slideWrapper.insertBefore(lastClone, slides[0]);

    const paginationBullets = document.querySelectorAll(".pagination-bullet");

    function updatePagination() {
        paginationBullets.forEach(bullet => {
            bullet.classList.remove("active");
        });

        const actualIndex = (currentIndex + 1) % totalSlides;
        let bulletIndex = 0;
        if (currentIndex < 5) {
            bulletIndex = currentIndex + 1;
        } else {
            bulletIndex = actualIndex;
        }

        paginationBullets[bulletIndex].classList.add("active");
    }

    function nextSlide() {
        updatePagination();
        currentIndex++;
        slideWrapper.style.transition = "transform 0.5s ease-in-out";
        slideWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function transitionEnd() {
        if (currentIndex === totalSlides + 1) {
            currentIndex = 1;
            slideWrapper.style.transition = "none";
            slideWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
    }

    slideWrapper.addEventListener("transitionend", transitionEnd);

    setInterval(nextSlide, 6000);

    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const popup = document.getElementById("portfolio-popup");
    const popupTitle = document.querySelector(".popup-title");
    const popupImage = document.querySelector(".popup-image");
    const popupDescription = document.querySelector(".popup-description");
    const closePopupBtn = document.querySelector(".close-popup-btn");

    function openPopup(title, imageSrc, descriptions, index) {
        popupTitle.textContent = title;
        popupImage.src = imageSrc;
        popupDescription.innerHTML = descriptions[index];
        popup.style.display = "flex";
    }

    function closePopup() {
        popup.style.display = "none";
    }

    portfolioItems.forEach((item, index) => {
        const plusBtn = item.querySelector(".open-popup");
        const title = item.querySelector(".portfolio-name").textContent;
        const imageSrc = item.querySelector("img").src;
        const descriptions = [
            "<p>Edmicro IELTS là ứng dụng luyện thi IELTS tiên phong, nổi bật với việc sử dụng công nghệ AI để tối ưu hóa quá trình học tập và nâng cao khả năng làm bài thi của người học. Với mục tiêu giúp các học viên đạt được kết quả cao trong kỳ thi IELTS, Edmicro IELTS đã xây dựng một hệ thống khóa học đa dạng, từ cơ bản đến nâng cao, phục vụ mọi nhu cầu học tập.</p><p style='margin-top: 20px'>Bản quyền thuộc về: <strong>Công ty TNHH Giáo dục Edmicro</strong><br>Địa chỉ: Tầng 4, nhà 25T2, lô N05, khu đô thị Đông Nam, đường Trần Duy Hưng, Phường Trung Hoà, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p><p style='text-align: center; margin-top: 20px; font-style: italic; color: #aaa'>Edmicro IELTS - Dẫn đầu hiệu quả, hướng dẫn bạn trên hành trình chinh phục IELTS một cách thông minh và hiệu quả.</p>",
            "<p>Ứng dụng ôn luyện tiểu học là một giải pháp giáo dục 4.0 dành cho học sinh tiểu học. Ứng dụng này giúp học sinh tiểu học xây dựng tư duy tự học ở nhà và củng cố kiến thức cùng giáo trình được biên soạn bám sát sách giáo khoa. Hệ thống sử dụng thuật toán thông minh để xây dựng bài luyện phù hợp cho từng học sinh dựa trên lịch sử ôn luyện.</p><p style='margin-top: 20px'>Bản quyền thuộc về: <strong>Công ty TNHH Giáo dục Edmicro</strong><br>Địa chỉ: Tầng 4, nhà 25T2, lô N05, khu đô thị Đông Nam, đường Trần Duy Hưng, Phường Trung Hoà, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>",
            "<p>Flexilearn.vn là một trang web giáo dục trực tuyến cung cấp các khóa học từ lớp 1 đến lớp 12. Trang web này cung cấp các bài giảng tương tác, giúp học sinh tiếp cận kiến thức một cách dễ dàng và thú vị. Các bài giảng được biên soạn bám sát sách giáo khoa, giúp học sinh củng cố kiến thức và chuẩn bị cho kỳ thi THPT Quốc gia.</p><p style='margin-top: 20px'>Bản quyền thuộc về: <strong>Công ty TNHH Giáo dục Edmicro</strong><br>Địa chỉ: Tầng 4, nhà 25T2, lô N05, khu đô thị Đông Nam, đường Trần Duy Hưng, Phường Trung Hoà, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>"
        ];

        plusBtn.addEventListener("click", function () {
            openPopup(title, imageSrc, descriptions, index);
        });
    });

    closePopupBtn.addEventListener("click", closePopup);
});