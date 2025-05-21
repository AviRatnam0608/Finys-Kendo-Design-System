class FNavBar extends HTMLElement {
  static navBarMenuItems = [
    {
      label: "Accounts",
      subitems: [
        {
          label: "Furniture",
          subitems: [
            {
              label: "Tables & Chairs",
              route: "www.youtube.com",
            },
            { label: "Sofas" },
            { label: "Occasional Furniture" },
            { label: "Childrens Furniture" },
            { label: "Beds" },
          ],
        },
      ],
    },
    {
      label: "Reports",
      subitems: [{ label: "Reports Dashboard" }, { label: "Resport Designer" }, { label: "Print Generation" }],
      quickActions: [
        {
          label: "Create Report"
        }
      ]
    },
  ];
  
  static logoUrl =
    "https://289umysog9.ufs.sh/f/k8fEief3SftoJw81KumkcXjto4vAEwiRkseDlPd29gSL81p5";
  
  static iconsList = [
    "clock-counter-clockwise",
    "star",
    "f-divider",
    "bell",
    "gear",
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

  // break out functions here
  
  // Making main Nav wrappper -> contains all nav item
  static createMainNavWrapper(){
    FNavBar.navigationMainWrapper = document.createElement("div");
    FNavBar.navigationMainWrapper.classList.add("f-navigation-header-main");
    FNavBar.navigationMainWrapper.setAttribute("data-role", "view");
    FNavBar.navigationMainWrapper.setAttribute("id", "nav-header");
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

      if (item.subitems && item.subitems.length) {
        const subUl = document.createElement("ul");
        FNavBar.buildlist(item.subitems, subUl);
        li.appendChild(subUl);
      }

      parentUl.appendChild(li);
    });
  }

  static createNavigationMenuItems(thisElement){
    const navigationOptions = document.createElement("div");
    navigationOptions.classList.add("f-navigation-options");

    console.log(thisElement);
    // Company Logo
    const img = document.createElement("img");
    img.classList.add("f-company-logo");
    img.src = FNavBar.logoUrl;
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

    FNavBar.buildlist(FNavBar.navBarMenuItems, ul);
    navigationOptionWrapper.appendChild(ul);

    FNavBar.navigationMainWrapper.appendChild(navigationOptions);
    navigationOptions.appendChild(img);
    navigationOptions.appendChild(navigationOptionWrapper);
  }

  static createSearchAndProfileGroup(vm, iconsList, userName, userImgUrl) {
    const container = document.createElement("div");
    container.classList.add("f-nav-bar-rhs-group");

    // 1) build the search+icon row
    const searchRow = FNavBar._createSearchAndShortcutContainer(vm, iconsList);

    // 2) build the avatar/profile
    const avatarBox = FNavBar._createAvatarContainer(userName, userImgUrl);

    container.appendChild(searchRow);
    container.appendChild(avatarBox);
    return container;
  }

  static _createSearchAndShortcutContainer(vm, iconsList) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("f-avatar-section");

    // 1) dropdown container
    const hdrSearch = document.createElement("f-header-search-container");
    const dd = document.createElement("input", { is: "f-header-search-dropdown" });
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
    for (let iconName of iconsList) {
      if (iconName === "f-divider") {
        const hr = document.createElement("hr");
        hr.classList.add("f-divider");
        actionIcons.appendChild(hr);
      } else {
        const btn = document.createElement("button");
        btn.classList.add("f-icon-btn");
        const i = document.createElement("i");
        i.classList.add("ph-light", `ph-${iconName}`);
        btn.appendChild(i);
        actionIcons.appendChild(btn);
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
    
    FNavBar.createMainNavWrapper();
    FNavBar.createNavigationMenuItems(this);

    const rightGroup = FNavBar.createSearchAndProfileGroup(
      this.vm,
      FNavBar.iconsList,
      this.getAttribute("user-name"),
      this.getAttribute("user-img")
    );
    FNavBar.navigationMainWrapper.appendChild(rightGroup);
    
    this.appendChild(FNavBar.navigationMainWrapper);
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

customElements.define("f-nav-bar", FNavBar);
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
