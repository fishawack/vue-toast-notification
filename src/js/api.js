import ToastComponent from './Component.vue'
import {createComponent} from './helpers';
import eventBus from './bus.js';

export const useToast = (globalProps = {}) => {
  return {
    open(options, slots = {}) {
      let message = null;
      if (typeof options === 'string') message = options;

      const defaultProps = {
        message
      };

      const propsData = Object.assign({}, defaultProps, globalProps, options);

      const instance = createComponent(ToastComponent, propsData, document.body, slots);

      return {
        dismiss: instance.ctx.dismiss
      }
    },
    clear() {
      eventBus.emit('toast-clear')
    },
    success(message, options = {}, slots = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'success'
      }, options), slots)
    },
    error(message, options = {}, slots = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'error'
      }, options), slots)
    },
    info(message, options = {}, slots = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'info'
      }, options), slots)
    },
    warning(message, options = {}, slots = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'warning'
      }, options), slots)
    },
    default(message, options = {}, slots = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'default'
      }, options), slots)
    }
  }
};
