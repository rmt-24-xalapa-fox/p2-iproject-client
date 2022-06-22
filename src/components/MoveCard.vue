<template>
<div class="battle-move-card">
  <div :class="`move-type type-${move.type.toLowerCase()}`">{{move.type}}</div>
  <div class="move-name">{{move.name}}</div>
  <div class="move-power">Power: {{move.power}}</div>
</div>
</template>

<script>
export default {
  name: "MoveCard",
  props: ["move"],
  methods: {

  },
}
</script>

<style>
.battle-move-card {
  min-width: 200px;
  min-height: 100px;
  height: 20%;
  width: 40%;
  background-color: #2f4e62;
  border: white 5px solid;  
  border-radius: 10%;
  -moz-border-radius: 10%; 
  -webkit-border-radius: 10%;  
  -webkit-box-shadow: 0px 0px 0px 10px #c6a74a;
  -moz-box-shadow: 0px 0px 0px 10px #c6a74a;
  box-shadow: 0px 0px 0px 10px #c6a74a;
  display: flex;  
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;  
}

.move-type { 
  color: white;
  width: fit-content; 
  padding: 0 20px;
  border-radius: 10px;
  border: white 1px solid;
}

.move-name {
  color: white;
  width: fit-content; 
  padding: 0 20px;
}

.move-power { 
  color: red; 
  width: fit-content; 
  padding: 0 20px;
}

.type-normal {
  background-color: rgb(77, 83, 86);
}

.type-fire {
  background-color: #f42;
}

.type-water {
  background-color: #39f;
}

.type-electric {
  background-color: #fc3;
}

.type-grass {
  background-color: #7c5;
}

.type-ice {
  background-color: #6cf;
}

.type-fighthing {
  background-color: #b54;
}

.type-poison {
  background-color: #a59;
}

.type-ground {
  background-color: #db5;
}

.type-flying {
  background-color: #89f;
}

.type-psychic {
  background-color: #f59;
}

.type-bug {
  background-color: #ab2;
}

.type-rock {
  background-color: rgb(95, 85, 42);
}

.type-ghost {
  background-color: #66b;
}

.type-dragon {
  background-color: #76e;
}

.type-dark {
  background-color: #754;
}

.type-steel {
  background-color: #aab;
}

.type-fairy {
  background-color: #e9e;
}

</style>