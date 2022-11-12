const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      end: false,
      turn: 0,
      logs: [],
      numberOfHeals: 5,
    };
  },
  methods: {
    attack() {
      const attactValue = Math.ceil(Math.random() * 10 + 7);
      this.monsterHealth -= attactValue;
      this.monsterAttack();
      this.turn += 1;
      this.logGenerator("Player", "Attack", attactValue);
    },
    monsterAttack() {
      const attactValue = Math.ceil(Math.random() * 10 + 12);
      this.playerHealth -= attactValue;
      this.logGenerator("Monster", "Attack", attactValue);
    },
    specialAttack() {
      const attactValue = Math.ceil(Math.random() * 10 + 15);
      this.monsterHealth -= attactValue;
      this.monsterAttack();
      this.turn = 0;
      this.logGenerator("Player", "Attack", attactValue);
    },
    heal() {
      if (this.playerHealth === 100 || this.numberOfHeals === 0) {
        return;
      }
      const healtValue = Math.ceil(Math.random() * 10 + 15);
      this.playerHealth += healtValue;
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      this.monsterAttack();
      this.turn += 1;
      this.logGenerator("Player", "Heal", healtValue);
      this.numberOfHeals -= 1;
    },
    surrender() {
      this.playerHealth = 0;
    },
    logGenerator(operator, action, amount) {
      this.logs.unshift(
        `${operator} ${action} with ${amount} ${
          action === "Attack" ? "Damage" : "HP"
        }`
      );
    },
    retry() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turn = 0;
      this.end = false;
      this.logs = [];
      this.numberOfHeals = 5;
    },
  },
  watch: {
    playerHealth() {
      if (this.playerHealth <= 0 && !this.end) {
        this.end = true;
        this.playerHealth = 0;
        this.logs.push("Monster Win!");
      }
    },
    monsterHealth() {
      if (this.monsterHealth <= 0 && !this.end) {
        this.end = true;
        this.monsterHealth = 0;
        this.logs.push("Player Win!");
      }
    },
  },
  computed: {
    specialAttackActive() {
      if (this.turn >= 3) {
        return true;
      }
      return false;
    },
  },
});

app.mount("#game");
