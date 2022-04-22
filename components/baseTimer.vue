<template>
  <div id="timer" class="timer">
    <div class="day">
      <span class="number">{{ days }}</span>
      <div class="format">
        {{ wordString.day }}
      </div>
    </div>
    <div class="hour">
      <span class="number">{{ hours }}</span>
      <div class="format">
        {{ wordString.hours }}
      </div>
    </div>
    <div class="min">
      <span class="number">{{ minutes }}</span>
      <div class="format">
        {{ wordString.minutes }}
      </div>
    </div>
    <div class="sec">
      <span class="number">{{ seconds }}</span>
      <div class="format">
        {{ wordString.seconds }}
      </div>
    </div>
    <div class="message">
      {{ message }}
    </div>
    <!-- <div class="status-tag" :class="statusType">{{ statusText }}</div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      timer: '',
      wordString: {},
      start: '',
      end: '',
      interval: '',
      days: '',
      minutes: '',
      hours: '',
      seconds: '',
      message: '',
      statusType: '',
      statusText: '',
      trans: {
        day: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        expired: 'Pod has been dropped.',
        running: 'Time Till Pod Drop.',
        upcoming: 'Time Till Pod Drop.',
        status: {
          expired: 'Expired',
          running: 'Running',
          upcoming: 'Future'
        }
      }
    }
  },
  created () {
    this.wordString = this.trans
  },
  mounted () {
    const launchDate = new Date()
    launchDate.setMonth(4)
    launchDate.setDate(9)
    launchDate.setHours(0)
    launchDate.setMinutes(0)
    // this.TIME_LIMIT = Math.ceil((this.launchDate - Date.now()) / 100);

    this.start = Date.now()
    this.end = new Date(launchDate)
    // Update the count down every 1 second
    this.timerCount(this.start, this.end)
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end)
    }, 1000)
  },
  methods: {
    timerCount (start, end) {
      // Get todays date and time
      const now = new Date().getTime()

      // Find the distance between now an the count down date
      const distance = start - now
      const passTime = end - now

      if (distance < 0 && passTime < 0) {
        this.message = this.wordString.expired
        this.statusType = 'expired'
        this.statusText = this.wordString.status.expired
        clearInterval(this.interval)
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime)
        this.message = this.wordString.running
        this.statusType = 'running'
        this.statusText = this.wordString.status.running
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance)
        this.message = this.wordString.upcoming
        this.statusType = 'upcoming'
        this.statusText = this.wordString.status.upcoming
      }
    },
    calcTime (dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24))
      this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000)
    }
  }
}
</script>
<style scoped lang="scss">
.timer {
  font-size: 20px;
  color: rgb(28, 14, 44);
  text-align: center;
  margin-top: 50px;
}

.day,
.hour,
.min,
.sec {
  font-size: 30px;
  display: inline-block;
  font-weight: 500;
  text-align: center;
  margin: 0 5px;
  .format {
    font-weight: 300;
    font-size: 14px;
    //@include margin-start(5);
    //display: inline-block;
    opacity: 0.8;
    width: 60px;
  }
}
.number {
  // background: rgba(51, 51, 51, 0.53);
  padding: 0 5px;
  border-radius: 5px;
  display: inline-block;
  width: 60px;
  text-align: center;
}
.message {
  font-size: 14px;
  font-weight: 400;
  margin-top: 5px;
}
.status-tag {
  width: 270px;
  margin: 10px auto;
  padding: 8px 0;
  font-weight: 500;
  color: #000;
  text-align: center;
  border-radius: 15px;
  &.upcoming {
    background-color: lightGreen;
  }
  &.running {
    background-color: gold;
  }
  &.expired {
    background-color: silver;
  }
}
</style>
