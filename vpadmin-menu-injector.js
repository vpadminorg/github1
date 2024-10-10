(function() {
    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
        #vpadminFloatingMenu {
            position: fixed !important;
            top: 20px !important;
            right: -25px !important;
            z-index: 9999 !important;
            transition: right 0.3s ease !important;
        }
        #vpadminFloatingMenu.vpadmin-active {
            right: 20px !important;
        }
        .vpadmin-floating-button {
            width: 50px !important;
            height: 50px !important;
            border-radius: 50% !important;
            background-color: rgba(52, 152, 219, 0.7) !important;
            color: white !important;
            border: none !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 24px !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            z-index: 10000 !important;
            user-select: none !important;
            transition: background-color 0.3s ease !important;
        }
        .vpadmin-floating-button:hover {
            background-color: rgba(52, 152, 219, 1) !important;
        }
        #vpadminFloatingMenu.dragging .vpadmin-floating-button {
            background-color: rgba(231, 76, 60, 1) !important;
            cursor: move !important;
        }
        .vpadmin-drag-arrows {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            display: none !important;
            color: rgba(231, 76, 60, 1) !important;
            font-size: 20px !important;
            pointer-events: none !important;
            z-index: 10001 !important;
        }
        .vpadmin-drag-arrows.top {
            top: -25px !important;
        }
        .vpadmin-drag-arrows.bottom {
            bottom: -25px !important;
        }
        #vpadminFloatingMenu.dragging .vpadmin-drag-arrows {
            display: block !important;
        }
        .vpadmin-dropdown-menu {
            display: none;
            position: absolute !important;
            right: 0 !important;
            top: 60px !important;
            background-color: white !important;
            border-radius: 4px !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
            z-index: 9999 !important;
            width: 200px !important;
            padding: 5px 0 !important;
        }
        .vpadmin-dropdown-menu.show {
            display: block;
        }
        .vpadmin-dropdown-menu a {
            display: block !important;
            padding: 10px 20px !important;
            color: #333 !important;
            text-decoration: none !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }
        .vpadmin-dropdown-menu a:hover {
            background-color: #f1f1f1 !important;
        }
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
        }
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            width: 300px;
        }
        .modal-close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            cursor: pointer;
        }
        .modal-form input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .modal-form button {
            width: 100%;
            padding: 10px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .modal-form button:hover {
            background-color: #2980b9;
        }
        @media (max-width: 768px) {
            #vpadminFloatingMenu {
                top: auto !important;
                bottom: 20px !important;
                right: -25px !important;
            }
            #vpadminFloatingMenu:hover {
                right: -25px !important;
            }
            #vpadminFloatingMenu.vpadmin-active {
                right: 20px !important;
            }
            .vpadmin-dropdown-menu {
                position: fixed !important;
                right: 20px !important;
                left: 20px !important;
                bottom: 80px !important;
                top: auto !important;
                width: auto !important;
                max-width: none !important;
                max-height: 50vh !important;
                overflow-y: auto !important;
            }
            .vpadmin-drag-arrows {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // 创建浮动菜单
    const floatingMenu = document.createElement('div');
    floatingMenu.id = 'vpadminFloatingMenu';
    floatingMenu.innerHTML = `
        <button class="vpadmin-floating-button" id="vpadminMenuToggle">☰</button>
        <div class="vpadmin-drag-arrows top">▲</div>
        <div class="vpadmin-drag-arrows bottom">▼</div>
        <div class="vpadmin-dropdown-menu" id="vpadminDropdownMenu">
            <a href="#" id="loginLink">登录</a>
            <a href="#">选项 2 - 另一个长菜单项</a>
            <a href="#">选项 3 - 第三个菜单项</a>
            <a href="#">选项 4 - 测试滚动</a>
            <a href="#">选项 5 - 更多选项</a>
            <a href="#">选项 6 - 滚动测试</a>
        </div>
    `;
    document.body.appendChild(floatingMenu);

    // 创建登录模态框
    const loginModal = document.createElement('div');
    loginModal.id = 'loginModal';
    loginModal.className = 'modal-overlay';
    loginModal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>登录</h2>
            <form class="modal-form">
                <input type="text" placeholder="用户名" required>
                <input type="password" placeholder="密码" required>
                <button type="submit">登录</button>
            </form>
        </div>
    `;
    document.body.appendChild(loginModal);

    // 初始化功能
    const menuToggle = document.getElementById('vpadminMenuToggle');
    const dropdownMenu = document.getElementById('vpadminDropdownMenu');
    const loginLink = document.getElementById('loginLink');
    const modalClose = loginModal.querySelector('.modal-close');
    let isMenuVisible = false;
    let isDragging = false;
    let startY, startTop;
    const isMobile = window.innerWidth <= 768;

    function toggleMenu(event) {
        event.stopPropagation();
        isMenuVisible = !isMenuVisible;
        floatingMenu.classList.toggle('vpadmin-active', isMenuVisible);
        dropdownMenu.classList.toggle('show', isMenuVisible);
    }

    function closeMenu() {
        isMenuVisible = false;
        floatingMenu.classList.remove('vpadmin-active');
        dropdownMenu.classList.remove('show');
    }

    function startDragging(event) {
        if (!isMobile && floatingMenu.getBoundingClientRect().right <= window.innerWidth) {
            isDragging = true;
            startY = event.clientY;
            startTop = floatingMenu.getBoundingClientRect().top;
            floatingMenu.classList.add('dragging');
            event.preventDefault();
        }
    }

    function drag(event) {
        if (isDragging) {
            let newTop = startTop + (event.clientY - startY);
            newTop = Math.max(0, Math.min(newTop, window.innerHeight - menuToggle.offsetHeight));
            floatingMenu.style.setProperty('top', `${newTop}px`, 'important');
            floatingMenu.style.setProperty('bottom', 'auto', 'important');
        }
    }

    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            floatingMenu.classList.remove('dragging');
        }
    }

    menuToggle.addEventListener('click', function(event) {
        if (!isDragging) {
            toggleMenu(event);
        }
    });

    document.addEventListener('click', function(event) {
        if (isMenuVisible && !floatingMenu.contains(event.target)) {
            closeMenu();
        }
    });

    dropdownMenu.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' && event.target.id !== 'loginLink') {
            closeMenu();
            event.preventDefault();
        }
    });

    if (!isMobile) {
        menuToggle.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        floatingMenu.addEventListener('mouseenter', function() {
            if (!isDragging) {
                floatingMenu.classList.add('vpadmin-active');
            }
        });

        floatingMenu.addEventListener('mouseleave', function() {
            if (!isMenuVisible && !isDragging) {
                floatingMenu.classList.remove('vpadmin-active');
            }
        });
    }

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginModal.style.display = 'block';
        closeMenu();
    });

    modalClose.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    loginModal.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    console.log('VPAdmin 菜单注入器已加载并初始化');
})();