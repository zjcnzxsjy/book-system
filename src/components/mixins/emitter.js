/* 事件广播与派发函数 */
function broadcast(_componentTag, eventName, params) {
    this.$children.forEach(child => {
      var name = child.$options._componentTag;
  
      if (name === _componentTag) {
        child.$emit.apply(child, [eventName].concat(params));
      } else {
        broadcast.apply(child, [_componentTag, eventName].concat([params]));
      }
    });
  }
  export default {
    methods: {
      dispatch(_componentTag, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options._componentTag;
  
        while (parent && (!name || name !== _componentTag)) {
          parent = parent.$parent;
  
          if (parent) {
            name = parent.$options._componentTag;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
      broadcast(_componentTag, eventName, params) {
        broadcast.call(this, _componentTag, eventName, params);
      }
    }
  };
  