$(function () {
  const classes = {
    opened: 'opened',
    active: 'active',
    isActive: 'is-active',
    fixed: 'fixed',
    hidden: 'hidden',
    noscroll: 'noscroll',
    visible: 'visible',
    fadeIn: 'fade-in',
    hasMenu: 'has-menu',
    copied: 'copied',
    disabled: 'disabled',
    selected: 'selected',
  };

  let windowWidth = window.innerWidth;
  const getWindowWidth = () => {
    windowWidth = window.innerWidth;
  };
  window.addEventListener('resize', getWindowWidth);

  const body = document.querySelector('body');
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.header__hamburger');

  const docsHamburger = document.querySelector('.docs__hamburger');
  const docsMenu = document.querySelector('.docs-aside');
  const docsTabs = document.querySelectorAll('.docs-tab');
  const docsLinks = document.querySelectorAll('.docs-menu__item');
  const referralsBtn = document.querySelector('.referrals-link-copy__btn');
  const formAmount = document.querySelector('.form-label__amount');
  const amountInput = document.querySelector('#sendAmount');
  const amountInputDeposit = document.querySelector('#sendAmountDeposit');
  const sendAmount = document.querySelector('.form__send-amount-value');
  const sendCurrency = document.querySelector('.form__send-amount-currency');
  const sendDailyCurrency = document.querySelector('.form__send-daily-amount-currency');
  const history = document.querySelector('.history');
  const inputFile = document.querySelectorAll('input[type=file]');
  const staking = document.querySelectorAll('.open-deposit-staking__radio input[type=radio]');
  const userHamburger = document.querySelector('.user__hamburger');
  const userMenu = document.querySelector('.user-aside');
  const userOverlay = document.querySelector('.user-overlay');

  const openDepositForm = document.querySelector('.open-deposit-form');
  if (openDepositForm) {
    openDepositForm.reset();
  }

  const receiveForm = document.querySelector('.receive-form');
  if (receiveForm) {
    receiveForm.reset();
  }

  const sendForm = document.querySelector('.send-form');
  if (sendForm) {
    sendForm.reset();
  }

  // ---------- HEADER FIXED ----------
  (function () {
    if (!header) return;

    const handleScroll = () => {
      header.classList.toggle('fixed', window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
  })();

  // ---------- LANGUAGE DROPDOWN ----------
  (function () {
    const blocks = document.querySelectorAll('.language');
    if (!blocks.length) return;

    blocks.forEach((block) => {
      const current = block.querySelector('.language__current');
      const dropdown = block.querySelector('.language__dropdown');
      if (!current || !dropdown) return;

      block._isOpen = false;

      current.addEventListener('click', (e) => {
        e.stopPropagation();
        block._isOpen = !block._isOpen;
        dropdown.classList.toggle('visible', block._isOpen);

        blocks.forEach((b) => {
          if (b !== block) {
            b.querySelector('.language__dropdown')?.classList.remove('visible');
          }
        });
      });
    });

    document.addEventListener('pointerdown', (event) => {
      blocks.forEach((block) => {
        const dropdown = block.querySelector('.language__dropdown');
        if (dropdown && !block.contains(event.target)) {
          dropdown.classList.remove('visible');
          block._isOpen = false;
        }
      });
    });
  })();

  // ---------- TOTAL VALUE LOCKED ----------
  (function () {
    const valueEl = document.querySelector('.hero-countdown__value');
    if (!valueEl) return;

    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    let currentValue = Number(localStorage.getItem('tvlValue')) || 26550490;

    function updateDisplay() {
      valueEl.textContent = formatNumber(currentValue);
    }

    updateDisplay();

    setInterval(() => {
      const increment = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
      currentValue += increment;

      localStorage.setItem('tvlValue', currentValue);
      updateDisplay();
    }, 10 * 60 * 1000);
  })();

  (function () {
    if (!hamburger) {
      return;
    }
    const toggleMenu = () => {
      hamburger.classList.toggle(classes.isActive);
      header.classList.toggle(classes.opened);
      body.classList.toggle(classes.noscroll);
    };
    hamburger.addEventListener('click', toggleMenu);
  })();

  (function () {
    if (!docsHamburger) {
      return;
    }
    const toggleDocsMenu = () => {
      docsMenu.classList.toggle(classes.opened);
      window.scrollTo({ top: 0 });
      showActiveMenuItem();
      docsHamburger.classList.toggle(classes.isActive);
    };
    docsHamburger.addEventListener('click', toggleDocsMenu);
  })();

  (function () {
    if (!userHamburger) {
      return;
    }
    const toggleUserMenu = () => {
      userHamburger.classList.toggle(classes.isActive);
      userMenu.classList.toggle(classes.opened);
      body.classList.toggle(classes.noscroll);
      userOverlay.classList.toggle(classes.opened);
    };

    userHamburger.addEventListener('click', toggleUserMenu);
  })();

  const closeUserMenu = () => {
    userHamburger.classList.remove(classes.isActive);
    userMenu.classList.remove(classes.opened);
    body.classList.remove(classes.noscroll);
    userOverlay.classList.remove(classes.opened);
  };

  (function () {
    if (!userOverlay) {
      return;
    }

    userOverlay.addEventListener('click', closeUserMenu);
  })();

  const handleDocsToggle = ({ currentTarget: target }) => {
    target.classList.toggle(classes.opened);
    const isOpen = target.classList.contains(classes.opened);
    const menu = target.parentElement.nextElementSibling;
    const menuItems = menu.querySelectorAll('li');
    const height = [...menuItems].reduce((sum, li) => sum + li.clientHeight, 0);
    menu.style.height = `${isOpen ? height : 0}px`;
    menu.style.opacity = isOpen ? 1 : 0;
  };

  const docsBtn = `<button class="docs-menu__toggle">
                    <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.499946 8.50086L4.50038 4.50043L0.499946 0.499993" stroke="#2FA8FF" stroke-linecap="round" />
</svg>
                  </button>`;

  const addToggle = (item) => {
    const child = item.querySelector('ul');
    const contains = item.contains(child);
    if (!contains) return;
    item.classList.add(classes.hasMenu);
    const link = item.querySelector('a');
    link.insertAdjacentHTML('beforeend', docsBtn);
    link.querySelector('.docs-menu__toggle').addEventListener('click', handleDocsToggle);
  };

  const showActiveMenuItem = () => {
    const active = [...docsLinks].filter((item) => item.classList.contains(classes.active));
    if (!active.length > 0) return;
    const isHasMenu = active[0].classList.contains(classes.hasMenu);

    let menu;
    isHasMenu
      ? (menu = active[0].querySelector('.docs-submenu'))
      : (menu = active[0].parentElement.parentElement.querySelector('.docs-submenu'));
    const menuItems = menu.querySelectorAll('li');
    const height = [...menuItems].reduce((sum, li) => sum + li.clientHeight, 0);
    menu.style.height = `${height}px`;
    menu.style.opacity = 1;
    let toggle;
    isHasMenu
      ? (toggle = active[0].querySelector('.docs-menu__toggle'))
      : (toggle = active[0].parentElement.parentElement.querySelector('.docs-menu__toggle'));
    toggle.classList.add(classes.opened);
  };

  let isNotesOpened = false;

  const notes = document.querySelector('.notifications');
  if (notes) {
    const notesBtn = notes.querySelector('.notifications-button');
    const notesClose = notes.querySelector('.notifications-close');
    const notesList = notes.querySelector('.notifications-list');
    const notesOverlay = document.querySelector('.notifications-overlay');

    const openNotes = () => {
      isNotesOpened = true;
      notes.classList.add(classes.visible);
      notesOverlay.classList.add(classes.visible);
      notesList?.scrollTo({ top: 0 });
      if (userMenu) closeUserMenu();
    };

    const closeNotes = () => {
      isNotesOpened = false;
      notes.classList.remove(classes.visible);
      notesOverlay.classList.remove(classes.visible);
    };

    const toggleNotes = (event) => {
      event.preventDefault();
      isNotesOpened ? closeNotes() : openNotes();
    };

    notesBtn.addEventListener('click', toggleNotes);
    notesClose.addEventListener('click', closeNotes);

    document.addEventListener('click', (e) => {
      if (isNotesOpened && !notes.contains(e.target) && !notesBtn.contains(e.target)) {
        closeNotes();
      }
    });
  }

  wow = new WOW({
    mobile: false,
  });
  wow.init();

  const logosSiders = document.querySelectorAll('.logos-slider');

  if (logosSiders.length > 0) {
    const repeatCount = 3;
    logosSiders.forEach((slider) => {
      const originalSlides = slider.innerHTML;
      for (let i = 0; i < repeatCount - 1; i++) {
        slider.insertAdjacentHTML('beforeend', originalSlides);
      }
    });
  }

  const handleDocsTab = ({ currentTarget: target }) => {
    target.classList.toggle(classes.opened);
  };

  //E-mail Ajax Send
  $('.login-form').submit(function (event) {
    event.preventDefault();
    var form = $(this);
    if (!event.target.checkValidity()) {
      form.find('[required]').focus();
    } else {
      $.ajax({
        url: 'mail.php',
        data: form.serialize(),
      }).done(function () {
        window.location.href = '/user.html';
      });
      return false;
    }
  });

  //Copy Referrals Link

  (function () {
    const copyBlocks = document.querySelectorAll('.referrals-link-copy');

    if (!copyBlocks.length) return;

    copyBlocks.forEach((block) => {
      const btn = block.querySelector('.referrals-link-copy__btn');
      if (!btn) return;

      btn.addEventListener('click', async (e) => {
        e.preventDefault();

        const targetSelector = btn.dataset.clipboardTarget;
        const targetEl = block.querySelector(targetSelector);
        if (!targetEl) return;

        const text = targetEl.textContent.trim();

        console.log(text);

        try {
          await navigator.clipboard.writeText(text);

          block.classList.add(classes.copied);
          setTimeout(() => {
            block.classList.remove(classes.copied);
          }, 3000);
        } catch (err) {
          console.error('Copy failed', err);
        }
      });
    });
  })();

  $('.balance-card__title').matchHeight({
    byRow: true,
    property: 'height',
    target: null,
    remove: false,
  });

  const handleInputFile = ({ target }) => {
    const file = target.files[0];
    const name = target.closest('.input-file').querySelector('.input-file__name');
    if (name != null) {
      name.innerHTML = file.name;
      name.classList.add(classes.selected);
    }
  };

  const changeAmountInput = ({ target: { value } }) => {
    if (!sendAmount) return;
    if (value) {
      sendAmount.innerText = value;
    } else {
      sendAmount.innerText = 0;
    }
  };

  const selectTermBlock = document.querySelector('.select-term');
  const selectDropdown = selectTermBlock?.querySelector('select');
  const radioTermInputs = selectTermBlock?.querySelectorAll('.currency-term input[type="radio"]');
  const sendText = document.querySelector('.form__send-text');
  const radios = document.querySelectorAll('.currency-radio input[type="radio"]');

  let percent = 1.1;

  const numberFixed = (number, fixed = 4) => {
    if (
      (typeof number === 'number' || typeof number === 'string') &&
      !isNaN(number - parseFloat(number))
    ) {
      const num = parseFloat(number);
      const [intPart, decimalPart = ''] = num.toString().split('.');

      if (decimalPart.length > 0) {
        const trimmedDecimal = decimalPart.slice(0, fixed);
        return parseFloat(`${intPart}.${trimmedDecimal}`);
      } else {
        return num;
      }
    }
    return NaN;
  };

  const areAllSelectsFilled = () => {
    const selects = document.querySelectorAll('.open-deposit-form .jqselect');
    const isTermVisible = getComputedStyle(selectTermBlock).display !== 'none';
    const filteredSelects = Array.from(selects).filter((select) => {
      return isTermVisible || select !== selectTermBlock.querySelector('.jqselect');
    });

    if (radios.length > 0) {
      const checkedRadios = document.querySelectorAll(
        '.currency-radio input[type="radio"]:checked',
      );
      return (
        filteredSelects.every((select) => select.classList.contains('changed')) &&
        checkedRadios.length > 0
      );
    } else {
      return filteredSelects.every((select) => select.classList.contains('changed'));
    }
  };

  const getSelectedTerm = () => {
    if (selectDropdown && selectDropdown.offsetParent !== null) {
      return selectDropdown.value;
    }
    if (radioTermInputs?.length) {
      const checked = [...radioTermInputs].find((radio) => radio.checked);
      return checked ? checked.value : null;
    }
    return null;
  };

  const changeAmountInputDeposit = () => {
    const amount = Number(amountInputDeposit.value);
    if (!amount || amount <= 0 || !percent || !areAllSelectsFilled()) {
      sendAmount.innerText = '0.00';
      return;
    }

    const selectedTerm = getSelectedTerm();
    const activeStaking = [...staking].find((s) => s.checked);
    if (!activeStaking) {
      sendAmount.innerText = '0.00';
      return;
    }

    let summ;
    if (activeStaking.value === 'locked' && selectedTerm) {
      const days = Number(selectedTerm);
      summ = Number(amount) * (percent / 100 / 30) * days;
    } else {
      summ = Number(amount) * (percent / 100 / 30);
    }

    sendAmount.innerText = numberFixed(summ, 4);
  };

  const requestPercent = () => {
    if (!areAllSelectsFilled()) {
      sendAmount.innerText = '0.00';
      return;
    }

    changeAmountInputDeposit();
    var formData = $('.open-deposit-form').serialize();
    console.log(formData);
    $.ajax({
      type: 'POST',
      url: '/wp-admin/admin-ajax.php', // ajaxurl должен быть определен в WordPress
      data: formData + '&action=get_deposit_percent',
      success: function (response) {
        if (response.success) {
          // Обновите поле процента на странице
          percent = response.data.percent;
          changeAmountInputDeposit();
        } else {
          console.log(response.data.message);
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
      },
    });
  };

  const activeStaking = () => {
    staking[0].checked = true;
  };

  const handleStaking = ({ currentTarget: target }) => {
    const value = target.value;
    if (!value) return;
    const slider = document.querySelector('.open-deposit-staking__slider');
    const calcDaily = slider.closest('.calculate')?.querySelector('.calculate-daily');
    if (value === 'flexible') {
      slider.classList.add(classes.active);
      if (selectDropdown) {
        selectDropdown.removeAttribute('required');
      }
      selectTermBlock.style.display = 'none';
      sendText.innerText = 'per 1 day';
      if (calcDaily) {
        calcDaily.style.display = 'none';
      }
    } else {
      slider.classList.remove(classes.active);
      if (selectDropdown) {
        selectDropdown.setAttribute('required', true);
      }
      selectTermBlock.style.display = 'block';
      sendText.innerText = 'for the entire period';
      if (calcDaily) {
        calcDaily.style.display = '';
      }
    }
    requestPercent();
  };

  if (amountInputDeposit) {
    amountInputDeposit.addEventListener('keyup', changeAmountInputDeposit);
  }

  if (staking.length > 0) {
    activeStaking();
    staking.forEach((radio) => {
      radio.addEventListener('change', handleStaking);
    });
  }

  if (radios.length > 0) {
    const selectRadioCurrency = ({ target }) => {
      const currency = target.value;
      formAmount.innerText = `(${currency})`;
      if (sendCurrency) {
        sendCurrency.innerText = `(${currency})`;
      }
      if (sendDailyCurrency) {
        sendDailyCurrency.innerText = `(${currency})`;
      }
    };
    radios.forEach((radio) => {
      radio.addEventListener('change', requestPercent);
      radio.addEventListener('change', selectRadioCurrency);
    });
  }

  if (radioTermInputs?.length > 0) {
    radioTermInputs.forEach((radio) => {
      radio.addEventListener('change', requestPercent);
    });
  }

  //EVENTS

  docsTabs.forEach((tab) => tab.addEventListener('click', handleDocsTab));

  docsLinks.forEach((item) => addToggle(item));

  (function () {
    if (!docsMenu > 0) {
      return;
    }
    showActiveMenuItem();
  })();

  (function () {
    if (!amountInput) {
      return;
    }
    amountInput.addEventListener('keyup', changeAmountInput);
  })();

  (function () {
    if (!history) {
      return;
    }
    const historyBlock = history.closest('.user-grid__item');
    const isHistory =
      historyBlock.classList.contains('user-grid__item--w30') &&
      !historyBlock.closest('.user-grid__column') &&
      windowWidth < 1200;
    if (isHistory) {
      const userGrid = document.querySelector('.user-grid');
      userGrid.append(historyBlock);
    }
  })();

  inputFile.forEach((input) => {
    input.addEventListener('change', handleInputFile);
  });

  (function () {
    const refernceTable = document.querySelector('.refernce-table');
    if (!refernceTable) return;
    const referralsStatus = document.querySelector('.referrals-status');
    if (!referralsStatus) return;
    const allMembers = referralsStatus.querySelector('[data-all-members]');
    const activeMembers = referralsStatus.querySelector('[data-active-members]');
    const allDeposits = referralsStatus.querySelector('[data-all-deposits]');
    const allProfit = referralsStatus.querySelector('[data-all-profit]');

    const replenishments = refernceTable.querySelectorAll('[data-replenishments]');
    const profits = refernceTable.querySelectorAll('[data-profit]');

    const parseNumber = (text) => Number(text.replace(/[^\d.]/g, '')) || 0;
    const formatUSD = (value) =>
      value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    const allMembersCount = refernceTable.querySelectorAll('tbody tr').length;
    allMembers.innerText = allMembersCount;

    const activeCount = [...replenishments].filter(
      (item) => parseNumber(item.innerText) > 0,
    ).length;
    activeMembers.innerText = activeCount;

    const depositsTotal = [...replenishments].reduce(
      (sum, item) => sum + parseNumber(item.innerText),
      0,
    );
    allDeposits.innerText = formatUSD(depositsTotal);

    const profitTotal = [...profits].reduce((sum, item) => sum + parseNumber(item.innerText), 0);
    allProfit.innerText = formatUSD(profitTotal);
  })();

  $('img, a').on('dragstart', function (event) {
    event.preventDefault();
  });

  $('.select').styler();

  const selectFormCurrency = ({ target }) => {
    const isDisabled = target.classList.contains(classes.disabled);
    if (isDisabled) return;
    const currency = target.innerText;
    formAmount.innerText = `(${currency})`;
    if (sendCurrency) {
      sendCurrency.innerText = `(${currency})`;
    }
  };
  const formCurrency = document.querySelectorAll('.form .select-system li');
  formCurrency.forEach((currency) => {
    currency.addEventListener('click', selectFormCurrency);
  });

  const openDepositSelect = document.querySelectorAll('.open-deposit-form .select li');
  const handleOpenDeposit = () => {
    requestPercent();
  };
  openDepositSelect.forEach((currency) => {
    currency.addEventListener('click', handleOpenDeposit);
  });

  //For Safari

  const selectSystem = document.querySelectorAll('.select-system .select');
  const handleSelectSystem = ({ target }) => {
    const selected = target.parentElement.querySelector('.selected');
    const currency = selected.innerText;
    formAmount.innerText = `(${currency})`;
  };
  selectSystem.forEach((select) => {
    select.addEventListener('change', handleSelectSystem);
  });

  const openDepositSelectSaf = document.querySelectorAll('.open-deposit-form .select');
  openDepositSelectSaf.forEach((select) => {
    select.addEventListener('change', handleOpenDeposit);
  });

  const countdown = document.querySelector('.countdown');

  (function () {
    if (!countdown) return;

    // Set the end date: Year, Month (0–11), Day, Hour, Minute, Second
    const END_DATE = new Date(2026, 4, 1, 0, 0, 0); // Example: May 1, 2025

    function getTimeLeft(endDate) {
      const now = new Date();
      const diff = Math.floor((endDate - now) / 1000);
      return diff;
    }

    function startCountdown(seconds) {
      let timer = seconds;

      const dayCard = countdown.querySelector('#days .flip-card');
      const hourCard = countdown.querySelector('#hours .flip-card');
      const minCard = countdown.querySelector('#minutes .flip-card');
      const secCard = countdown.querySelector('#seconds .flip-card');

      function animateDigitChange(digitElem, newDigit) {
        const current = digitElem.innerText;
        if (current === newDigit) return;

        const oldSpan = document.createElement('span');
        oldSpan.className = 'old';
        oldSpan.innerText = current;

        const newSpan = document.createElement('span');
        newSpan.className = 'new';
        newSpan.innerText = newDigit;

        digitElem.innerText = '';
        digitElem.appendChild(oldSpan);
        digitElem.appendChild(newSpan);

        setTimeout(() => {
          digitElem.innerText = newDigit;
        }, 400);
      }

      function updateDigit(card, value) {
        const digits = String(value).padStart(2, '0');
        const [tNew, uNew] = digits;
        const tens = card.querySelector('.tens');
        const units = card.querySelector('.units');

        animateDigitChange(tens, tNew);
        animateDigitChange(units, uNew);
      }

      const intervalId = setInterval(() => {
        if (timer <= 0) {
          clearInterval(intervalId);
          countdown.style.display = 'none';
          return;
        }
        const days = Math.floor(timer / 86400);
        const hours = Math.floor((timer % 86400) / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        updateDigit(dayCard, days);
        updateDigit(hourCard, hours);
        updateDigit(minCard, minutes);
        updateDigit(secCard, seconds);

        timer--;
      }, 1000);
    }

    const secondsLeft = getTimeLeft(END_DATE);

    if (secondsLeft > 0) {
      startCountdown(secondsLeft);
    } else {
      countdown.style.display = 'none';
    }
  })();

  const tokensSlider = document.querySelector('.currency-radio-wrapper');

  (function () {
    if (!tokensSlider) return;
    new Swiper('.currency-radio-wrapper', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      grabCursor: true,
      freeMode: true,
      resistanceRatio: 0,
      freeModeMomentumBounce: false,
    });
  })();

  const columns = document.querySelectorAll('.road-map-item');
  (function () {
    if (columns.length === 0) return;

    if (window.$ && $.fn.matchHeight) {
      $('.road-map-item').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false,
      });
    }

    let foundActive = false;

    const wayContainer = document.querySelector('.road-map-way');

    columns.forEach((column) => {
      if (foundActive) {
        column
          .querySelector('.road-map-item__column')
          .classList.add('road-map-item__column--dashed');
      }
      if (column.classList.contains('active') && !foundActive) {
        foundActive = true;

        const id = column.getAttribute('data-roadmap-id');
        if (id && wayContainer) {
          const img = document.createElement('img');
          img.src = `/images/road-ways/${id}.svg`;
          img.alt = `Road map ${id}`;
          wayContainer.innerHTML = '';
          wayContainer.appendChild(img);
        }
      }
    });
  })();
});
