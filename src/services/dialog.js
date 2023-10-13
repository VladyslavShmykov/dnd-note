export class Dialog {
    options = {
        height: '400px',
        width: '400px',
        borderRadius: '12px',
        background: '#fff',
        closeOnBackdropClick: true,
        onClosing: () => void 0,
        onInit: () => void 0
    };

    open(template, options) {

        document.body.classList.add('block-body-scroll');

        Object.assign(this.options, options);

        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.left = '0';
        div.style.top = '0';
        div.id = 'DIALOG-N';
        div.style.zIndex = '9999';
        div.style.background = 'rgba(220,220,204,0.15)';
        div.style.minHeight = '100vh';
        div.style.minWidth = '100vw';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';

        document.body.appendChild(div);

        document.getElementById('DIALOG-N').addEventListener('click', (e) => {
            if (e.target.id === 'DIALOG-N') this.close();
        })

        this.addPassedTemplate(template);

        this.options.onInit();
    }

    repaint(template) {
        const scroll = document.getElementById('dialog-wrapper-123').scrollTop;

        this.addPassedTemplate(template);

        this.options.onInit();
        document.getElementById('dialog-wrapper-123').scrollTo(0, scroll);
    }

    addPassedTemplate(template) {
        const dialog = document.getElementById('DIALOG-N');

        dialog.innerHTML = `<div id="dialog-wrapper-123" style="width: ${this.options.width}; height: ${this.options.height}; max-height: 100vh; max-width: 100vw; border-radius: ${this.options.borderRadius}; background: ${this.options.background}; overflow: auto; padding: 16px">
            ${template}
        </div>`;
    }

    close() {
        document.body.classList.remove('block-body-scroll');

        const dialog = document.getElementById('DIALOG-N');

        dialog.parentNode.removeChild(dialog);

        this.options.onClosing();

    }
}