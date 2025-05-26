class Grid extends HTMLDivElement {
    // do not include events: {detailInit}, this causes misalignment of columns
    connectedCallback() {
        this.classList.add("f-grid");
        this.setAttribute('data-role', 'grid');
        this.setAttribute('data-toolbar', this.getAttribute('data-toolbar') || "[{template: kendo.template($('#table-header').html())}]")
        this.setAttribute('data-scrollable', this.getAttribute('data-scrollable') || 'false');
        if(!document.getElementById('table-header')) {
            document.querySelector('body').appendChild(this.getHeaderTemplate())
        }
        this.showGridCounter();
    }

    showGridCounter() {
        const regex = /(?<start>\d+)\s*-\s*(?<end>\d+)\s*of\s*(?<total>\d+)/i;
        const stringItem = $(".f-grid .k-pager-info.k-label").text();
        const { groups: { start, end, total } = {} } = stringItem.match(regex) || {};
  
        $(".f-grid .k-pager-info.k-label").html(`
            <span>Items ${start} - ${end}  </span>
            <span style="
                color: var(--neutral);
                margin-left: 4px;
            "> of ${total}</span>`
        );
    }

    getHeaderTemplate() {
        const script = document.createElement('script');
        script.setAttribute('id', 'table-header');
        script.setAttribute('type', 'text/x-kendo-template');
        script.innerHTML = `
            <header class="f-table-header f-generated-template">
                <div class="f-table-header-group">
                    <span class='f-table-label'>${this.getAttribute('data-finys-label')}</span>
                    <span class="f-tag" data-bind="text: ${this.getAttribute('data-finys-tag')}"></span>
                </div>
                <div class="f-table-header-group">
                    ${this.getAttribute('data-finys-header-buttons') || ''}
                </div>
            </header>
        `
        return script;
    }
}

customElements.define('finys-grid', Grid, {extends:  'div'})
export {Grid};