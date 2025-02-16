<template>
  <div class="d-flex flex-column h-100">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="Background-tab" data-bs-toggle="tab" href="#Background" role="tab" aria-controls="Background" aria-selected="true">{{$t('SpeedIsKey.tab1.tab') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="Simulator-tab" data-bs-toggle="tab" href="#Simulator" role="tab" aria-controls="Simulator" aria-selected="false">{{$t('SpeedIsKey.tab2.tab') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="Guide-tab" data-bs-toggle="tab" href="#Guide" role="tab" aria-controls="Guide" aria-selected="false">{{$t('SpeedIsKey.tab3.tab') }}</a>
      </li>
    </ul>
    <div class="tab-content flex-grow-1" id="myTabContent">
      <div class="tab-pane fade show active p-4" id="Background" role="tabpanel" aria-labelledby="Background-tab">
        <p style="font-size: 18px;white-space: pre-wrap;">{{$t('SpeedIsKey.tab1.description') }} </p>
      </div>
      <div class="tab-pane fade p-4" id="Guide" role="tabpanel" aria-labelledby="Guide-tab">
        <p style="font-size: 18px;white-space: pre-wrap;">{{$t('SpeedIsKey.tab3.description') }} </p>
      </div>
      <div class="tab-pane fade h-100" id="Simulator" role="tabpanel" aria-labelledby="Simulator-tab">
        <div class="battle-simulator">
          <div class="row">
            <!-- 战场区域 -->
            <div class="col-md-8">
              <div id="battlefield" ref="battlefield">
                <!-- 使用 Vue 模板生成 unit 元素 -->
                <div
                    v-for="unit in units"
                    :key="unit.id"
                    class="unit"
                    :style="{
                      left: unit.position.x + 'px',
                      top: unit.position.y + 'px'
                    }"
                  >
                    <div
                      class="unit-border"
                      :style="{
                        borderColor: unit.color,
                        width: unit.radius * 2 + 'px',
                        height: unit.radius * 2 + 'px'
                      }"
                    ></div>
                    <div
                      class="unit-circle"
                      :class="{ flashing: unit.isFlashing }"
                      :style="{
                        width: unit.radius * 2 + 'px', // 固定半径
                        height: unit.radius * 2 + 'px', // 固定半径
                        backgroundColor: unit.color,
                        opacity: unit.health / 100 // 用透明度表示血量
                      }"
                    ></div>
                  </div>
              </div>
            </div>
      
            <!-- 控制面板区域 -->
            <div class="col-md-4">
              <div class="row">
                <!-- Unit 1 控制面板 -->
                <div class="col-md-6">
                  <h2>Unit 1</h2>
                  <div class="form-group">
                    <label for="unit1Health">Health:</label>
                    <input type="number" id="unit1Health" v-model="unit1.health" class="form-control" placeholder="Health">
                  </div>
                  <div class="form-group">
                    <label for="unit1Attack">Attack:</label>
                    <input type="number" id="unit1Attack" v-model="unit1.attack" class="form-control" placeholder="Attack">
                  </div>
                  <div class="form-group">
                    <label for="unit1Speed">Speed:</label>
                    <input type="number" id="unit1Speed" v-model="unit1.speed" class="form-control" placeholder="Speed">
                  </div>
                  <div class="form-group">
                    <label for="unit1Range">Range:</label>
                    <input type="number" id="unit1Range" v-model="unit1.range" class="form-control" placeholder="Range">
                  </div>
                  <div class="form-group">
                    <label for="unit1AttackSpeed">Attack Speed:</label>
                    <input type="number" id="unit1AttackSpeed" v-model="unit1.attackSpeed" class="form-control" placeholder="Attack Speed">
                  </div>
                  <div class="form-group">
                    <label for="unit1Count">Count:</label>
                    <input type="number" id="unit1Count" v-model="unit1.count" class="form-control" placeholder="Count">
                  </div>
                </div>
      
                <!-- Unit 2 控制面板 -->
                <div class="col-md-6">
                  <h2>Unit 2</h2>
                  <div class="form-group">
                    <label for="unit2Health">Health:</label>
                    <input type="number" id="unit2Health" v-model="unit2.health" class="form-control" placeholder="Health">
                  </div>
                  <div class="form-group">
                    <label for="unit2Attack">Attack:</label>
                    <input type="number" id="unit2Attack" v-model="unit2.attack" class="form-control" placeholder="Attack">
                  </div>
                  <div class="form-group">
                    <label for="unit2Speed">Speed:</label>
                    <input type="number" id="unit2Speed" v-model="unit2.speed" class="form-control" placeholder="Speed">
                  </div>
                  <div class="form-group">
                    <label for="unit2Range">Range:</label>
                    <input type="number" id="unit2Range" v-model="unit2.range" class="form-control" placeholder="Range">
                  </div>
                  <div class="form-group">
                    <label for="unit2AttackSpeed">Attack Speed:</label>
                    <input type="number" id="unit2AttackSpeed" v-model="unit2.attackSpeed" class="form-control" placeholder="Attack Speed">
                  </div>
                  <div class="form-group">
                    <label for="unit2Count">Count:</label>
                    <input type="number" id="unit2Count" v-model="unit2.count" class="form-control" placeholder="Count">
                  </div>
                </div>
              </div>
      
              <!-- 开始按钮 -->
              <button @click="startSimulation" class="btn btn-primary mt-3">Start</button>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>  
  </template>
  
<script>
import { setI18nLanguage } from '/src/lang/i18n';
import { useLanguageStore } from '@/store/language';
import { computed, onMounted  } from 'vue'; 
  export default {
    setup() {
      const languageStore = useLanguageStore();
      const currentLanguage = computed(() => languageStore.locale);
      console.log(currentLanguage.value);

      // 使用 onMounted 钩子
      onMounted(() => {
        setI18nLanguage(currentLanguage.value, 'SpeedIsKey'); 
      });
      
      return {
        currentLanguage
      };
    },
    data() {
      return {
        unit1: {
          health: 100,
          attack: 20,
          speed: 10,
          range: 50,
          attackSpeed: 5,
          count: 5
        },
        unit2: {
          health: 100,
          attack: 20,
          speed: 50,
          range: 50,
          attackSpeed: 5,
          count: 5
        },
        units: [],
        intervalId: null
      };
    },
    methods: {
      startSimulation() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
  
        this.units = []; // 清空单位数组
  
        this.createUnits('unit1', true); // Unit 1 在左侧
        this.createUnits('unit2', false); // Unit 2 在右侧
        this.startBattle();
      },
      createUnits(unitId, isLeftSide) {
        const unitData = this[unitId];
        const sideWidth = this.$refs.battlefield.offsetWidth;
        const sideHeight = this.$refs.battlefield.offsetHeight;


  
        for (let i = 0; i < unitData.count; i++) {
          let x = isLeftSide ? 30 : sideWidth + 10; // 加simulator的padding，根据radius调整
          let y = 30 + Math.random() * (sideHeight - 20); // 随机 y 位置
  
          // 检查是否与其他单位重叠
          let overlap = true;
          while (overlap) {
            overlap = false;
            this.units.forEach(existingUnit => {
              const existingRadius = existingUnit.radius; // 使用固定半径
              const newRadius = 10; // 固定半径
              const distance = Math.sqrt(
                Math.pow(x - existingUnit.position.x, 2) +
                Math.pow(y - existingUnit.position.y, 2)
              );
              if (distance < existingRadius + newRadius) {
                overlap = true;
                y = 30 + Math.random() * (sideHeight - 20); // 重新生成 y 位置
              }
            });
          }
  
          const unit = {
            id: `${unitId}-${i}`,
            health: unitData.health,
            initialHealth: unitData.health,
            attack: unitData.attack,
            speed: unitData.speed,
            range: unitData.range,
            attackSpeed: unitData.attackSpeed,
            position: { x, y },
            color: unitId === 'unit1' ? 'red' : 'blue',
            radius: 10, // 固定半径
            target: null,
            lastAttackTime: 0,
            isFlashing: false // 添加 isFlashing 属性
          };
  
          this.units.push(unit); // 将单位添加到 units 数组
        }
      },
      startBattle() {
        this.intervalId = setInterval(() => {
          const actions = [];

          this.units.forEach(unit => {
            if (unit.health <= 0) {
              this.units = this.units.filter(u => u !== unit); // 移除死亡单位
            }
          })
          
          this.units = this.units.sort(() => Math.random() - 0.5);

  
          this.units.forEach(unit => {

  
            // 找到最近的敌方单位
            unit.target = this.units
              .filter(u => u.id !== unit.id && u.id.split('-')[0] !== unit.id.split('-')[0] && u.health > 0)
              .reduce((nearest, current) => {
                const distanceToCurrent = this.calculateDistance(unit, current);
                const distanceToNearest = nearest ? this.calculateDistance(unit, nearest) : Infinity;
                return distanceToCurrent < distanceToNearest ? current : nearest;
              }, null);
  
            if (unit.target) {
              const distance = this.calculateDistance(unit, unit.target);
  
              // 如果目标在攻击范围内
              if (distance <= unit.range) {
                if (Date.now() - unit.lastAttackTime >= 1000 / unit.attackSpeed) {
                  actions.push({ attacker: unit, target: unit.target });
                  unit.lastAttackTime = Date.now();
                  unit.isFlashing = true; // 触发闪烁
                  setTimeout(() => {
                    unit.isFlashing = false; // 结束闪烁
                  }, 100);
                }
              } else {
                // 否则，向目标移动
                const directionX = (unit.target.position.x - unit.position.x) / distance;
                const directionY = (unit.target.position.y - unit.position.y) / distance;
                const newX = unit.position.x + directionX * unit.speed;
                const newY = unit.position.y + directionY * unit.speed;
  
                let canMove = true;
                this.units.forEach(otherUnit => {
                  if (unit !== otherUnit) {
                    const otherDistance = Math.sqrt(
                          Math.pow(newX - otherUnit.position.x, 2) +
                          Math.pow(newY - otherUnit.position.y, 2)
                        ) - otherUnit.radius - unit.radius;
                    if (otherDistance < 0) {
                      canMove = false;
                    }
                  }
                });
  
                if (canMove) {
                  unit.position.x += directionX * unit.speed;
                  unit.position.y += directionY * unit.speed;
                } else {
                  // 尝试寻找新的移动方向
                  const angle = Math.atan2(directionY, directionX);
                  const angles = [angle + Math.PI / 4, angle - Math.PI / 4, angle + Math.PI / 2, angle - Math.PI / 2];
                  for (const newAngle of angles) {
                    const newDirectionX = Math.cos(newAngle);
                    const newDirectionY = Math.sin(newAngle);
  
                    // 计算按照新方向移动后的坐标
                    const newX = unit.position.x + newDirectionX * unit.speed;
                    const newY = unit.position.y + newDirectionY * unit.speed;
  
                    let canMoveInNewDirection = true;
                    this.units.forEach(otherUnit => {
                      if (unit !== otherUnit) {
                        const otherRadius = otherUnit.radius; // 使用固定半径
                        const newRadius = unit.radius; // 使用固定半径
                        const otherDistance = Math.sqrt(
                          Math.pow(newX - otherUnit.position.x, 2) +
                          Math.pow(newY - otherUnit.position.y, 2)
                        ) - otherRadius - newRadius; // 边缘距离
  
                        if (otherDistance < 0) {
                          canMoveInNewDirection = false;
                        }
                      }
                    });
  
                    if (canMoveInNewDirection) {
                      // 如果可以移动，则更新单位的位置
                      unit.position.x = newX;
                      unit.position.y = newY;
                      break; // 找到一个可行的方向后，跳出循环
                    }
                  }
                }
              }
            }
          });
  
          // 执行攻击
          actions.forEach(action => {
            action.target.health -= action.attacker.attack;
          });
  
          // 如果只剩一个单位，停止战斗
          if (this.units.length < 2) {
            clearInterval(this.intervalId);
          }
        }, 30);
      },
      calculateDistance(unit1, unit2) {
        const radius1 = unit1.radius; // 使用固定半径
        const radius2 = unit2.radius; // 使用固定半径
        const centerDistance = Math.sqrt(
          Math.pow(unit1.position.x - unit2.position.x, 2) +
          Math.pow(unit1.position.y - unit2.position.y, 2)
        );
        return centerDistance - radius1 - radius2; // 返回边缘距离
      }
    }
  };
  </script>
  
  <style scoped>
  .battle-simulator {
    padding: 20px;
    position: relative;
  }
  
  .col-md-8 {
    display: flex;
}

#battlefield {
    flex-grow: 1; /* 占用剩余的空间 */
    border: 1px solid #000;
    box-sizing: border-box; /* 边框和内边距包含在宽度和高度之内 */
}
  .unit {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .unit-border {
  border: 2px solid; /* 圆框宽度和样式 */
  border-color: inherit; /* 继承单位的颜色 */
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  pointer-events: none; /* 确保圆框不影响交互 */
}
  
  .unit-circle {
    border-radius: 50%;
    position: absolute;
    transition: width 0.1s, height 0.1s, opacity 0.1s; /* 添加 opacity 过渡 */
  }
  
  .unit-circle.flashing {
    animation: flash 0.1s;
  }
  
  @keyframes flash {
    0% { background-color: white; }
    50% { background-color: transparent; }
    100% { background-color: white; }
  }
  </style>