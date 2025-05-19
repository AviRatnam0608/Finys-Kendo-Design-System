kendo.data.binders.widget.isSelected = kendo.data.Binder.extend({
    refresh: function () {
      const value = this.bindings["isSelected"].get();
      if (!value?.id) {
        $(this.element.element)
          .closest(".f-dropdown.k-picker")
          .removeClass("f-selected");
      } else {
        $(this.element.element)
          .closest(".f-dropdown.k-picker")
          .addClass("f-selected");
      }
    },
  });

class DropdownPreview extends HTMLElement {
    constructor() {
        super();
        this.vm = kendo.observable({
            basicDropdownValue: null,
            listData: new kendo.data.DataSource({
                data: [
                  {
                    id: 1,
                    name: "test1",
                  },
                  {
                    id: 2,
                    name: "test2",
                  },
                  {
                    id: 3,
                    name: "test3",
                  },
                ],
            }),
            groupListData: new kendo.data.DataSource({
                data: [
                  {
                    id: 1,
                    name: "Apple",
                    group: "Eins",
                  },
                  {
                    id: 2,
                    name: "Banana",
                    group: "Eins",
                  },
                  {
                    id: 3,
                    name: "Beef",
                    group: "Zwei",
                  },
                  {
                    id: 4,
                    name: "Pork",
                    group: "Zwei",
                  },
                  {
                    id: 5,
                    name: "Poultry",
                    group: "Zwei",
                  },
          
                  {
                    id: 6,
                    name: "Water",
                    group: "Drei",
                  },
                  {
                    id: 7,
                    name: "Water",
                    group: "Drei",
                  },
                  {
                    id: 8,
                    name: "Water",
                    group: "Drei",
                  },
                  {
                    id: 9,
                    name: "Water",
                    group: "Drei",
                  },
                  {
                    id: 10,
                    name: "Water",
                    group: "Drei",
                  },
                  {
                    id: 11,
                    name: "Water",
                    group: "Drei",
                  },
                ],
                group: { field: "group" },
              }),
              templatedListData: new kendo.data.DataSource({
                data: [{
                  id: 1,
                  AgentCode: "AgentCode",
                  AgentName: 'AgentName',
                  AgencyCode: 'AgencyCode',
                  AgencyName: 'AgencyName',
                  Address: 'Address'
                },
                {
                  id: 2,
                  AgentCode: "50012",
                  AgentName: 'Michael Jordan',
                  AgencyCode: '82134',
                  AgencyName: 'Jordan Agency',
                  Address: '123 Sycamore St, NJ, USA, 78123'
                }
                ],
              }),
        })
    }

    connectedCallback() {
        this.render();
    }

    createDropdown() {
        const dropdown = document.createElement('input', {is: 'finys-dropdownlist'});
        dropdown.setAttribute('data-bind',
            'value: basicDropdownValue, source: listData, isSelected: basicDropdownValue'
        )
        return dropdown;
    }

    createGroupDropdown() {
        const dropdown = document.createElement('input', {is: 'finys-dropdownlist'});
        dropdown.setAttribute('data-bind',
            'value: basicDropdownValue, source: groupListData, isSelected: basicDropdownValue'
        )
        return dropdown;
        
    }

    createTemplateDropdown() {
        const dropdown = document.createElement('input', {is: 'finys-detailed-dropdownlist'});
        dropdown.setAttribute('data-text-field', 'AgentName');
        dropdown.setAttribute('data-value-field', 'AgentCode');
        dropdown.setAttribute('data-detail-left', 'AgencyCode');
        dropdown.setAttribute('data-detail-right', 'AgencyName');
        dropdown.setAttribute('data-detail-bottom', 'Address');
        dropdown.setAttribute('data-bind',
            'value: basicDropdownValue, source: templatedListData, isSelected: basicDropdownValue'
        )
        return dropdown;
    }

    render(dropdownType) {
        this.innerHTML = '';
        switch(dropdownType) {
            case 'group':
                this.setGroupDropdown();
                break;
            case 'template':
                this.setTemplateDropdown();
                break;
            default:
                this.setGenericDropdown();
        }
        this.appendChild(this.dropdown);
        customElements.whenDefined('finys-code-viewer')
            .then(() => {
                this.updateCodeViewer();
            })
        kendo.bind($(this.dropdown), this.vm);
    }

    setGenericDropdown() {
        this.dropdown = this.createDropdown();
        this.unattachedDropdown = this.createDropdown();
    }

    setGroupDropdown() {
        this.dropdown = this.createGroupDropdown();
        this.unattachedDropdown = this.createGroupDropdown();
    }

    setTemplateDropdown() {
        this.dropdown = this.createTemplateDropdown();
        this.unattachedDropdown = this.createTemplateDropdown();
    }

    updateCodeViewer() {
        const codeViewer = document.querySelector('finys-code-viewer');
        codeViewer.render(this.unattachedDropdown.outerHTML);
    }
}

customElements.define('dropdown-preview', DropdownPreview);
