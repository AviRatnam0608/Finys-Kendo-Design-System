class FNavbar extends HTMLElement {
  static navBarMenuItems = [
    {
      label: "Accounting",
      subitems: [
        {
          label: "Check Release",
          route: "/check-release"
        },
        {
          label: "Check Processing",
          route: "/check-processing"
        },
        {
          label: "Bank Reconcilliation",
          route: "/ban-reconcilliation"
        }
      ],
    },
    {
      label: "Claims",
      subitems: [
        {
          label: "Claims Home",
          route: "/"
        },
        {
          label: "Contacts",
          route: "/"
        },
        {
          label: "Pending FNOLs",
          route: "/"
        },
        {
          label: "Payment/ Reserve Approval",
          route: "/"
        },
        {
          label: "Unlock Data",
          route: "/"
        },
      ],
      quickActions: [
        {
          label: "Create FNOL",
          route: "/"
        },
      ]
    },
    {
      label: "Policy",
      subitems: [
        {
          label: "Policy Home",
          route: "/"
        },
        {
          label: "Pending Quotes",
          route: "/"
        },
        {
          label: "Unlock Activity",
          route: "/"
        },
        {
          label: "Agency Maintainance",
          route: "/"
        },
      ],
      quickActions: [
        {
          label: "Create Dwelling Fire Quote",
          route: "/"
        },
        {
          label: "Create Dwelling Fire Application",
          route: "/"
        },
        {
          label: "Create Commercial Property Quote",
          route: "/"
        },
        {
          label: "Create Commercial Property Application",
          route: "/"
        },
        {
          label: "Export Transactions",
          route: "/",
          icon: "upload-simple"
        },
        {
          label: "Import Transactions",
          route: "/",
          icon: "download-simple"
        },
      ]
    },
    {
      label: "Billing",
      subitems: [
        {
          label: "Suspense Account",
          route: "/"
        },
        {
          label: "Payments",
          route: "/"
        },
        {
          label: "Quote Payments",
          route: "/"
        },
        {
          label: "Agency Payment Management",
          route: "/"
        },
      ],
    },
    {
      label: "Reports",
      subitems: [
        { label: "Reports Dashboard", route: "/"}, 
        { label: "Resport Designer", route: "/" }, 
        { label: "Print Generation", route: "/" }
      ],
      quickActions: [
        {
          label: "Create Report",
          route: "/"
        },
      ]
    },
  ];
  
  static logoUrl =
    "https://289umysog9.ufs.sh/f/k8fEief3SftoJw81KumkcXjto4vAEwiRkseDlPd29gSL81p5";
  
  static iconsOptionsList = [
    "recently-viewed",
    "favorites",
    "f-divider",
    "notifications",
    "settings",
  ];

  static userInfo = { 
    userName: "Lebron James",
    userRole: "Claims Manager",
    userImg: "https://randomuser.me/api/portraits/men/36.jpg",
    joinDate: "3/28/2025"
  }
  
  constructor() {
    super();

    this.vm = kendo.observable({
      selectedName: 1,
      isVisible: true,
      textboxValue: "",
      onSelect: function (e) {
        var text = $(e.item).children(".k-link").text();
        console.log("event :: select(" + text + ")");
      },
      dummyDropdownData: new kendo.data.DataSource({
        data: [
          {
            Id: 1,
            Name: "All",
          },
          {
            Id: 2,
            Name: "Claims",
          },
          {
            Id: 3,
            Name: "Policy",
          },
          {
            Id: 4,
            Name: "Billing",
          },
        ],
      }),
    });
  }

  connectedCallback() {
    // initial render
    this.render();
    kendo.bind($(this), this.vm);
  }
  
  // Making main Nav wrappper -> contains all nav item
  initNavProperties() {
    this.classList.add("f-navigation-header-main");
    this.setAttribute("data-role", "view");
    this.setAttribute("id", "nav-header");
  }

  buildMenu(arr, parentUl){
      arr.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("f-navigation-item");

      let linkEl;
      if (item.route) {
        linkEl = document.createElement("a");
        linkEl.href = item.route;

        // Intercept clicks for client-side routing:
        linkEl.addEventListener("click", (e) => {
          e.preventDefault();
          console.log("click evbent", item.route);
        });
      } else {
        linkEl = document.createElement("span");
      }
      
      linkEl.classList.add("f-navigation-link");
      linkEl.textContent = item.label;
      li.appendChild(linkEl);

      if(item.quickActions){
        const subUl = document.createElement("ul");
        const subLi = document.createElement("li");
        subUl.classList.add("f-quick-action-ul");
        subUl.appendChild(subLi);
        subLi.appendChild(FNavbar.#buildQuickActionsPanel(item));
        li.appendChild(subUl);
      } else if (item.subitems?.length) {
        const subUl = document.createElement("ul");
        this.buildMenu(item.subitems, subUl);
        li.appendChild(subUl);
      }
  
      parentUl.appendChild(li);
    });
  }

  static #buildQuickActionsPanel(item){
    const panel = document.createElement("div");
    panel.classList.add("f-quick-action-template")

    panel.innerHTML = `
        <div class="f-navigation-menu-container">
          <ul class="k-group k-menu-group k-menu-group-md" role="menu">
            ${item.subitems.map((subitem)=>{
              return `
                <li class="f-navigation-item k-item k-menu-item">
                  <a href="${subitem.route}">
                    ${subitem.label}
                  </a>
                </li>`
            }).join("")}
          </ul>
        </div>

        <div class="f-navigation-menu-container f-quick-actions-container f-border-rounded-right">
          <span class="f-quick-actions-title">Quick Actions</span>
          <ul style="list-style:none; margin:0; padding:0;">
            ${item.quickActions.map((subitem)=>{
              return `
                <li style="display: flex; align-items:center; margin:0; margin-bottom: 1rem">
                  <i class="ph ph-${subitem.icon ? subitem.icon : "plus-circle"}" style="margin-right: 0.25rem; font-size: 1rem; color: var(--primary) "></i>
                  <span style="font-weight: 600; font-size: 0.875rem; color:#006DDB; white-space:nowrap">
                    <a href="${subitem.route}" class="f-quick-action-link">
                      ${subitem.label}
                    </a>
                  </span>
                </li>
              `
            }).join("")}
          </ul>
        </div>
    `;
    return panel;
  }

  static #buildUserProfilePanel(userInfo){
    const panel = document.createElement("div");
    panel.classList.add("f-quick-action-template");

    panel.innerHTML = `
      <div class="f-user-profile-panel">
        <div class="f-user-details-container">
          <div class="f-user-details">
            <img src="${userInfo.userImg}" alt="${userInfo.userName}" class="f-avatar f-user-details-avatar" />
            <span>${userInfo.userName}</span>
          </div>
          <div class="f-user-details-role">
            <span>${userInfo.userRole} | ${userInfo.joinDate}</span>
          </div>
        </div>
        <div class="f-user-details-action-buttons">
          <ul class="k-group k-menu-group k-menu-group-md" role="menu">
            <li class="f-navigation-item k-item k-menu-item">
              <a href="null" class="f-navigation-link k-link k-menu-link">
                My Profile
              </a>
            </li>
            <li class="f-navigation-item k-item k-menu-item">
              <a href="null" class="f-navigation-link k-link k-menu-link">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    `
    return panel;
  }

  createNavigationMenuItems(){
    const navigationOptions = document.createElement("div");
    navigationOptions.classList.add("f-navigation-options");

    // Company Logo
    const img = document.createElement("img");
    img.classList.add("f-company-logo");
    img.src = FNavbar.logoUrl;
    img.alt = "Company Logo";

    const navigationOptionWrapper = document.createElement("div");
    navigationOptionWrapper.classList.add("f-navigation", "f-desktop-nav");

    // build the <ul id="nav-bar" ...>
    const ul = document.createElement("ul");
    ul.id = this.getAttribute("menu-id") || "navbar";
    ul.setAttribute("data-role", "menu");
    ul.style.width = "100%";

    // Start of the RHS side of the nav bar
    const navigationIconsWrapperSection = document.createElement("div");
    navigationIconsWrapperSection.classList.add("f-avatar-section");

    this.buildMenu(FNavbar.navBarMenuItems, ul);
    navigationOptionWrapper.appendChild(ul);

    navigationOptions.appendChild(img);
    navigationOptions.appendChild(navigationOptionWrapper);

    return navigationOptions;
  }

  createSearchAndProfileGroup(vm, iconsList, userInfo) {
    const container = document.createElement("div");
    container.classList.add("finys-navbar-rhs-group");

    // 1) build the search+icon row
    const searchRow = this._createSearchAndShortcutContainer(vm, iconsList);

    // 2) build the avatar/profile
    const avatarBox = this._createAvatarContainer(userInfo);

    container.appendChild(searchRow);
    container.appendChild(avatarBox);
    return container;
  }

  _createSearchAndShortcutContainer() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("f-avatar-section");

    // 1) dropdown container
    const hdrSearch = document.createElement("f-header-search-container");
    const dd = document.createElement("input", { is: "f-header-search-dropdown"});
    const ti = document.createElement("input", { is: "f-header-search-input" });
    hdrSearch.appendChild(dd);

    // 2) textbox + icon
    const searchBar = document.createElement("div");
    searchBar.classList.add("f-search-input");
    const icon = document.createElement("i");
    icon.classList.add("ph-light", "ph-magnifying-glass", "f-search-icon");
    searchBar.append(icon, ti);
    hdrSearch.appendChild(searchBar);

    wrapper.appendChild(hdrSearch);

    // 3) the action icons
    const actionIcons = document.createElement("div");
    actionIcons.classList.add("f-action-icons-container");

    for (let iconName of FNavbar.iconsOptionsList) {
        if (iconName === "f-divider") {
          const hr = document.createElement("hr");
          hr.classList.add("f-divider");
          actionIcons.appendChild(hr);
        } else {
          const recentlyViewed = document.createElement("button", { is: `f-${iconName}-button`});
          actionIcons.appendChild(recentlyViewed);
        }
    }
    wrapper.appendChild(actionIcons);

    return wrapper;
  }

  _createAvatarContainer(userInfo) {
    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("f-avatar-container");

    const img = document.createElement("img");
    img.classList.add(
      "f-avatar",
      "k-avatar", "k-avatar-solid-primary",
      "k-avatar-solid", "k-avatar-md", "k-rounded-full"
    );
    img.src = userInfo.userImg;
    img.alt = "User Avatar";

    const ul = document.createElement("ul");
    ul.id = this.getAttribute("menu-id") || "user-profile";
    ul.setAttribute("data-role", "menu");

    const li = document.createElement("li");
    li.classList.add("f-navigation-item");

    const userNameContainer = document.createElement("span");
    userNameContainer.classList.add("f-navigation-link");
    userNameContainer.textContent = userInfo.userName;
    li.appendChild(userNameContainer);

    const subUl = document.createElement("ul");
    const subli = document.createElement("li");
    subUl.classList.add("f-quick-action-ul");
    subli.appendChild(FNavbar.#buildUserProfilePanel(userInfo));
    
    ul.appendChild(li);
    li.appendChild(subUl);
    subUl.appendChild(subli);

    avatarContainer.append(img, ul);
    return avatarContainer;
  }


  render() {    
    this.initNavProperties();
    const navigationSection = this.createNavigationMenuItems();

    this.appendChild(navigationSection);

    const rightGroup = this.createSearchAndProfileGroup(
      this.vm,
      FNavbar.iconsList,
      FNavbar.userInfo
    );
    this.appendChild(rightGroup);
  }
}

class FHeaderSearchElementContainer extends HTMLElement {
  static get observedAttributes() {
    return ["dropdownItems"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    // initial render
    this.classList.add("f-search-element-container");
    this.setAttribute("id", "f-search-container");
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "dropdownItems" && oldVal !== newVal) {
      this.render();
    }
  }

  render() {}
}

class FHeaderSearchElementDropdown extends HTMLInputElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute("data-role", "dropdownlist");
    this.setAttribute("data-auto-bind", "false");
    this.setAttribute("data-value-primitive", "true");

    this.setAttribute("data-text-field", "Name");
    this.setAttribute("data-value-field", "Id");
    this.setAttribute(
      "data-bind",
      "value: selectedName, source: dummyDropdownData"
    );

    this.classList.add(
      "f-dropdown-styles",
      "f-border-rounded-left",
      "f-text-small",
      "f-weight-semi-bold"
    );
  }
}

class FHeaderSearchElementInput extends HTMLInputElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.setAttribute("data-role", "textbox");
    this.setAttribute("data-format", "c");
    this.setAttribute("data-min", "0");
    this.setAttribute("data-max", "100");
    this.setAttribute("placeholder", "Search");
    this.setAttribute("data-bind", "value: textboxValue");

    this.classList.add("f-header-search-input-textbox");
  }
}


class FinysRecentlyViewedMenu extends HTMLButtonElement {

  // this should come from some backend point
  static test =[
    { id: "keep-text", text: "Keep Text Only", icon: "clipboard-text", click: function(e) { console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-html", text: "Paste as HTML", icon: "clipboard-code", click:function(e){ console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-markdown", text: "Paste Markdown", icon: "clipboard-markdown", click: function(e) { console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-default", text: "Set Default Paste", click: function(e){ console.log("event :: click \#" + $(e.currentTarget).attr("id"));  } }
  ];

  connectedCallback() {
    const tmplId = 'f-recently-viewed-template';

    this.createRecentlyViewedTemplate(tmplId);

    // 1) set up element
    this.classList.add('f-recently-viewed', 'f-icon-btn');
    this.setAttribute('data-role', 'dropdownbutton');
    this.setAttribute('data-items', JSON.stringify(FinysRecentlyViewedMenu.test));

    // 2) pick an ID for your template
    this.setAttribute('data-template', tmplId);

    // 3) your button’s icon
    this.innerHTML = `<i class="ph-light ph-clock-counter-clockwise"></i>`;

    // 4) build & append the <script> so Kendo can find it


    // 5) finally, initialize the widget (imperative approach)
    //    so it picks up your data-items + data-template
    // kendo.init(this); 
  }

  createRecentlyViewedTemplate(tmplId){
    const script = document.createElement('script');
    script.setAttribute("id", tmplId);
    script.setAttribute("type", "text/x-kendo-template")
    script.innerHTML = `
      <div class="f-recently-viewed-template">
        <!-- you can use #: text #, #: icon # etc here -->
        #= text # 9203402
      </div>
    `;
    document.querySelector('body').appendChild(script);
  }
}

class FinysFavoritesMenu extends HTMLButtonElement {

  // this should come from some backend point
  static test =[
    { id: "keep-text", text: "Keep Text Only", icon: "clipboard-text", click: function(e) { console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-html", text: "Paste as HTML", icon: "clipboard-code", click:function(e){ console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-markdown", text: "Paste Markdown", icon: "clipboard-markdown", click: function(e) { console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-default", text: "Set Default Paste", click: function(e){ console.log("event :: click \#" + $(e.currentTarget).attr("id"));  } }
  ];

  connectedCallback() {
      this.classList.add('f-recently-viewed')
      this.setAttribute('data-role', 'dropdownbutton');
      this.setAttribute('data-items', JSON.stringify(FinysFavoritesMenu.test));
      this.innerHTML = `
        <i class="ph-light ph-star"></i>
      `
      this.classList.add("f-icon-btn")
  }
}

class FinysNotificationsMenu extends HTMLButtonElement {

  // this should come from some backend point
  static test =[
    { id: "keep-text", text: "Keep Text Only", icon: "clipboard-text", click: function(e) { console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-html", text: "Paste as HTML", icon: "clipboard-code", click:function(e){ console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-markdown", text: "Paste Markdown", icon: "clipboard-markdown", click: function(e) { console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-default", text: "Set Default Paste", click: function(e){ console.log("event :: click \#" + $(e.currentTarget).attr("id"));  } }
  ];

  connectedCallback() {
      this.classList.add('f-recently-viewed')
      this.setAttribute('data-role', 'dropdownbutton');
      this.setAttribute('data-items', JSON.stringify(FinysNotificationsMenu.test));
      this.innerHTML = `
        <i class="ph-light ph-bell"></i>
      `
      this.classList.add("f-icon-btn")
  }
}

class FinysSettingsMenu extends HTMLButtonElement {

  // this should come from some backend point
  static test =[
    { id: "keep-text", text: "Keep Text Only", icon: "clipboard-text", click: function(e) { console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-html", text: "Paste as HTML", icon: "clipboard-code", click:function(e){ console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-markdown", text: "Paste Markdown", icon: "clipboard-markdown", click: function(e) { console.log("event :: click \#" + $(e.currentTarget).attr("id")); }},
    { id: "paste-default", text: "Set Default Paste", click: function(e){ console.log("event :: click \#" + $(e.currentTarget).attr("id"));  } }
  ];

  connectedCallback() {
      this.classList.add('f-recently-viewed')
      this.setAttribute('data-role', 'dropdownbutton');
      this.setAttribute('data-items', JSON.stringify(FinysSettingsMenu.test));
      this.innerHTML = `
        <i class="ph-light ph-gear"></i>
      `
      this.classList.add("f-icon-btn")
  }
}


customElements.define(
  "f-header-search-container",
  FHeaderSearchElementContainer
);
customElements.define(
  "f-header-search-dropdown",
  FHeaderSearchElementDropdown,
  { extends: "input" }
);
customElements.define("f-header-search-input", FHeaderSearchElementInput, {
  extends: "input",
});

customElements.define("finys-navbar", FNavbar);

customElements.define("f-recently-viewed-button", FinysRecentlyViewedMenu, {
  extends: "button",
});
customElements.define("f-favorites-button", FinysFavoritesMenu, {
  extends: "button",
});
customElements.define("f-notifications-button", FinysNotificationsMenu, {
  extends: "button",
});
customElements.define("f-settings-button", FinysSettingsMenu, {
  extends: "button",
});
