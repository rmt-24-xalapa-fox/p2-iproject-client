<template>
<div class="battle-move-card">
  <div class="move-type">{{move.type}}</div>
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
  width: 50%;
  border: white 1px dotted;  
  display: flex;  
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;  
}

.move-type { 
  color: gre;
  width: fit-content; 
  padding: 0 20px;
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
</style>