"use strict";(self["webpackChunkall_simulator"]=self["webpackChunkall_simulator"]||[]).push([[605],{8605:function(t){t.exports=JSON.parse('{"tab1":{"tab":"背景","description":"想象一下，一个赌徒在赌场的赌桌前准备大展拳脚。假设赌徒从资产为n元的状态开始，他每次投掷都是独立的，且每一次输赢的概率均为50%。作为一个贪心不足的赌徒，当他赢得一定筹码时会乘胜追击，而当他亏损时会决心赢回本金继续赌局。当赌徒输光所有本金或赢得赌场所有财产（视为无限大）时游戏结束。\\n\\n我们可以用数轴上的点来表示资产状况，当赢得一次赌局向右移动1个单位，当输掉一次赌局向左移动1个单位，这是一个典型的随机游走场景。虽然赌徒的资产会在某些时刻增加或减少，但从理论上讲，只要一直进行赌局他最终会返回到0。我们可以通过差分方程得出上述结论。这叫做一维随机游走的常返性。\\n\\n现在，一无所有的赌徒决定一醉方休。他喝得酩酊大醉后离开家，在街道上踉跄而行。在这次的模型中，醉汉在二维空间上漫步，每一步都有相同的概率向上下左右四个方向移动。虽然醉汉在短期内可能会远离家，但幸运的是，只要足够长的时间，醉汉几乎总是会回到原点。这就是二维随机游走的常返性。\\n\\n"},"tab2":{"tab":"模拟器","description":""},"tab3":{"tab":"指南","description":"我们给出了二维的模拟器。您可以调整初始的x，y坐标，x轴最大范围，移动间隔，是否锁定为一维，来模拟随机游走过程。有时候可能需要上万步才能返回原点"}}')}}]);