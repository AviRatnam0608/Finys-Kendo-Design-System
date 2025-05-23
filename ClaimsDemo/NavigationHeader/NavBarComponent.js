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

  // add static vars here
  static navigationMainWrapper = document.createElement("div");

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
    const searchSection = this.querySelector("#nav-header");
    if (searchSection) {
      kendo.bind(searchSection, this.vm);
    }
  }
  
  // Making main Nav wrappper -> contains all nav item
  static createMainNavWrapper(){
    FNavbar.navigationMainWrapper = document.createElement("div");
    FNavbar.navigationMainWrapper.classList.add("f-navigation-header-main");
    FNavbar.navigationMainWrapper.setAttribute("data-role", "view");
    FNavbar.navigationMainWrapper.setAttribute("id", "nav-header");
  }

  static buildlist(arr, parentUl){
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
        const subli = document.createElement("li");
        subUl.classList.add("f-quick-action-ul");
        subUl.appendChild(subli);
        subli.appendChild(FNavbar._buildQuickActionsPanel(item));
        li.appendChild(subUl);
      } else if (item.subitems && item.subitems.length) {
        const subUl = document.createElement("ul");
        FNavbar.buildlist(item.subitems, subUl);
        li.appendChild(subUl);
      }
  
      parentUl.appendChild(li);
    });
  }

  static _buildQuickActionsPanel(item){
    const panel = `
      <div class="f-quick-action-template">
        <div class="f-quick-action-items">
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

        <div class="f-quick-action-items f-quick-action-rhs f-border-rounded-right">
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
      </div>
    `;
    return document.createRange().createContextualFragment(panel);
  }

  static createNavigationMenuItems(thisElement){
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
    ul.id = thisElement.getAttribute("menu-id") || "nav-bar";
    ul.setAttribute("data-role", "menu");
    ul.style.width = "100%";

    // Start of the RHS side of the nav bar
    const navigationIconsWrapperSection = document.createElement("div");
    navigationIconsWrapperSection.classList.add("f-avatar-section");

    FNavbar.buildlist(FNavbar.navBarMenuItems, ul);
    navigationOptionWrapper.appendChild(ul);

    FNavbar.navigationMainWrapper.appendChild(navigationOptions);
    navigationOptions.appendChild(img);
    navigationOptions.appendChild(navigationOptionWrapper);
  }

  static createSearchAndProfileGroup(vm, iconsList, userName, userImgUrl) {
    const container = document.createElement("div");
    container.classList.add("finys-navbar-rhs-group");

    // 1) build the search+icon row
    const searchRow = FNavbar._createSearchAndShortcutContainer(vm, iconsList);

    // 2) build the avatar/profile
    const avatarBox = FNavbar._createAvatarContainer(userName, userImgUrl);

    container.appendChild(searchRow);
    container.appendChild(avatarBox);
    return container;
  }

  static _createSearchAndShortcutContainer(vm, iconsList) {
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

  static _createAvatarContainer(userName, userImgUrl) {
    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("f-avatar-container");

    const img = document.createElement("img");
    img.classList.add(
      "f-avatar", "f-avatar-no-margin",
      "k-avatar", "k-avatar-solid-primary",
      "k-avatar-solid", "k-avatar-md", "k-rounded-full"
    );
    img.src = userImgUrl;
    img.alt = "User Avatar";

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("f-text-tiny", "f-weight-medium");
    nameSpan.innerText = userName;

    const caret = document.createElement("i");
    caret.classList.add("ph-light", "ph-caret-down");

    avatarContainer.append(img, nameSpan, caret);
    return avatarContainer;
  }


  render() {
    // clear out any previous content
    this.innerHTML = "";
    
    FNavbar.createMainNavWrapper();
    FNavbar.createNavigationMenuItems(this);

    const rightGroup = FNavbar.createSearchAndProfileGroup(
      this.vm,
      FNavbar.iconsList,
      this.getAttribute("user-name"),
      this.getAttribute("user-img")
    );
    FNavbar.navigationMainWrapper.appendChild(rightGroup);
    
    this.appendChild(FNavbar.navigationMainWrapper);
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
    // this.setAttribute('data-text-field', this.getAttribute('data-text-field') || "Name");
    // this.setAttribute('data-value-field', this.getAttribute('data-value-field') || "Id");
    // this.setAttribute('data-bind', this.getAttribute('data-bind') || "value: selectedName, source: dummyDropdownData" );

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
      this.classList.add('f-recently-viewed')
      this.setAttribute('data-role', 'dropdownbutton');
      this.setAttribute('data-items', JSON.stringify(FinysRecentlyViewedMenu.test));
      this.setAttribute('data-header-template',
        '<div class="k-my-header">Recently viewed items</div>'
      );
      this.innerHTML = `
        <i class="ph-light ph-clock-counter-clockwise"></i>
      `
      this.classList.add("f-icon-btn")
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


customElements.define("finys-navbar", FNavbar);
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