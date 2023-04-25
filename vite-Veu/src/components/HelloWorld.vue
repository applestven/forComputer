<template>
  <div class="calculator">
    <div class="display">{{ currentValue }}</div>
    <div class="keypad">
      <div class="key-row">
        <button class="key" @click="clearScreen">C</button>
        <button class="key" @click="signToggle">±</button>
        <button class="key" @click="percentize">%</button>
        <button class="key" @click="operations('/');">÷</button>
      </div>
      <div class="key-row">
        <button class="key" @click="numberClick('7');">7</button>
        <button class="key" @click="numberClick('8');">8</button>
        <button class="key" @click="numberClick('9');">9</button>
        <button class="key" @click="operations('*');">×</button>
      </div>
      <div class="key-row">
        <button class="key" @click="numberClick('4');">4</button>
        <button class="key" @click="numberClick('5');">5</button>
        <button class="key" @click="numberClick('6');">6</button>
        <button class="key" @click="operations('-');">-</button>
      </div>
      <div class="key-row">
        <button class="key" @click="numberClick('1');">1</button>
        <button class="key" @click="numberClick('2');">2</button>
        <button class="key" @click="numberClick('3');">3</button>
        <button class="key" @click="operations('+');">+</button>
      </div>
      <div class="key-row">
        <button class="key" @click="numberClick('0');">0</button>
        <button class="key" @click="numberClick('.');">.</button>
        <button class="key" @click="evaluate">=</button>
      </div>
    </div>

    <!-- <div class="container">
      <div class="toggle-options">
        <label>
          <input type="radio" value="style1" v-model="style">
          Style 1
        </label>
        <label>
          <input type="radio" value="style2" v-model="style">
          Style 2
        </label>
      </div>
      <div class="content" :class="style">
        <h1 v-if="style === 'style1'">Style 1</h1>
        <h1 v-if="style === 'style2'">Style 2</h1>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      style: 'style1',
      currentValue: "0",
      previousValue: null,
      operation: null,
      waitingForOperand: false
    };
  },
  methods: {
    clearScreen() {
      this.currentValue = "0";
      this.previousValue = null;
      this.operation = null;
      this.waitingForOperand = false;
    },
    signToggle() {
      this.currentValue = String(Number(this.currentValue) * -1);
    },
    percentize() {
      this.currentValue = String(Number(this.currentValue) / 100);
    },
    numberClick(value) {
      if (this.waitingForOperand) {
        this.currentValue = String(value);
        this.waitingForOperand = false;
      } else {
        this.currentValue =
          this.currentValue === "0" ? String(value) : this.currentValue + value;
      }
    },
    operations(operation) {
      if (this.operation && !this.waitingForOperand) {
        this.evaluate();
      }
      this.operation = operation;
      this.previousValue = this.currentValue;
      this.waitingForOperand = true;
    },
    evaluate() {
      let currentValue = Number(this.currentValue);
      let previousValue = Number(this.previousValue);
      let result = "";
      switch (this.operation) {
        case "+":
          result = previousValue + currentValue;
          break;
        case "-":
          result = previousValue - currentValue;
          break;
        case "*":
          result = previousValue * currentValue;
          break;
        case "/":
          result = previousValue / currentValue;
          break;
        default:
          result = currentValue;
      }
      this.currentValue = String(result);
      this.previousValue = null;
      this.operation = null;
      this.waitingForOperand = true;
    }
  },
  watch: {
    style(newStyle) {
      console.log("newStyle",newStyle);
      if (newStyle === 'style1') {
        import("../assets/css/style1.scss")
      } else if (newStyle === 'style2') {
        import("../assets/css/style2.scss")
      }
    }
  },
  created(){
    if(this.style == 'style1' ) {
      import("../assets/css/style1.scss")
    }else{
      
    }
  }  

};
</script>

<style lang="scss">
.content {
  &.style1 {
    background-color: red;
    color: white;
    @import "example1";
  }

  &.style2 {
    background-color: blue;
    color: white;
  }
}

// .calculator {
//   width: 350px;
//   margin: auto;
//   background-color: #555;
//   border-radius: 5px;
//   box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
//   padding: 10px;
// }

// .display {
//   background-color: #fff;
//   color: #333;
//   font-size: 36px;
//   text-align: right;
//   padding: 10px;
//   margin-bottom: 10px;
//   border-radius: 5px;
// }

// .key-row {
//   display: flex;
// }

// .key {
//   width: 70px;
//   height: 70px;
//   font-size: 24px;
//   color: #fff;
//   background-color: #999;
//   margin: 5px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// .key.operation {
//   background-color: #ff8c00;
// }

// .key.equals {
//   background-color: #3db3f7;
// }

// .key:focus {
//   outline: none;
// }

// .key:active {
//   transform: translateY(3px);
//   box-shadow: none;
// }


</style>
