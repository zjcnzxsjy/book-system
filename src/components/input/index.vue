<template>
    <div class='input__wrapper' :class="[{
        'input--prefix': $slots.prefix || prefixIcon,
        'input--suffix': $slots.suffix || suffixIcon || showClear,
        'input-no-border-radius': noBorderRadius
    }]">
        <input class="input__inner" 
        :placeholder="placeholder" 
        :value="currentValue" 
        ref="input"
        @input='handleInput'
        @change='handleChange'>
        <span class='input__prefix' v-if="$slots.prefix || prefixIcon">
            <slot name="prefix"></slot>
            <i class="input__icon" v-if="prefixIcon" :class="prefixIcon">
            </i>
        </span>
        <span class='input__suffix' v-if="$slots.suffix || suffixIcon || showClear">
            <span class="input__suffix-inner">
                <template v-if="!showClear">
                    <slot name="suffix"></slot>
                    <i class="input__icon" v-if="suffixIcon" :class="suffixIcon">
                    </i>
                </template>
                <i v-else class="input__icon el-icon-third-close-circle" @click="clear"></i>
            </span>
        </span>
        </span>
    </div>
</template>
<script>
export default {
  name: "selfInput",
  data() {
    return {
      currentValue: this.value
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    suffixIcon: String,
    prefixIcon: String,
    clearable: {
      type: Boolean,
      default: false
    },
    noBorderRadius: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput(event) {
        const value = event.target.value;
        this.$emit('input', value);
        this.setCurrentValue(value);
    },
    handleChange(event) {
        this.$emit('change', event.target.value);
    },
    setCurrentValue (value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
    },
    clear() {
      this.setCurrentValue('');
    }
  },
  computed: {
    showClear() {
      return this.clearable && this.currentValue !== "";
    }
  }
};
</script>
<style lang="scss" scoped>
.input__wrapper {
  display: flex;
  position: relative;
  .input__inner {
    -webkit-appearance: none;
    background-color: $White;
    background-image: none;
    border-radius: 4px;
    border: 1px solid $Mischka;
    box-sizing: border-box;
    color: $Shuttle-Gray;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 28px;
    outline: none;
    padding: 0 0.2778rem;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .input__prefix {
    height: 28px;
    line-height: 28px;
    text-align: center;
    transition: all 0.3s;
    position: absolute;
    left: 0.0926rem;
    top: 0;
    color: $Mischka;
  }
  .input__suffix {
    height: 28px;
    line-height: 28px;
    text-align: center;
    transition: all 0.3s;
    position: absolute;
    right: 0.0926rem;
    top: 0;
    color: $Mischka;
  }
  .input__icon {
    height: 100%;
    width: 0.5556rem;
    display: inline-block;
  }
}
.input--prefix .input__inner {
  padding-left: 0.7407rem;
}
.input--suffix .input__inner {
  padding-right: 0.7407rem;
}
.input-no-border-radius .input__inner {
  border-radius: 0;
}
</style>

