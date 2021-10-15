<template>
  <v-main>
    <v-container fluid grid-list-md>
      <v-layout row wrap justify-center>
        <!-- Left card -->
        <v-flex d-flex xs12 sm5 md4 lg4>
          <v-card id="left_card" class="pad_card">
            <v-layout mt-4 column align-center>
              <p class="headline">Professional</p>
            </v-layout>

            <div column align-center my-4 mx-3>
              <v-subheader inset>Statement</v-subheader>
              <div
                class="text-xs-center statement"
                style="white-space: pre-line"
              >
                I was a veteran, but it is tech I am better in. 
                I have an entrepreneurial spirit, and work with me and you will hear it. 
                I work up and down the stack, if you need something done on me you can always fall back. 
                I enjoy learning about systems and coming up with efficient solutions, 
                I seek to impress those around me with my creative contributions, 
                I will gain the respect of everyone I meet, even the confucians.
              </div>
            </div>

            <div column align-center my-4 mx-3>
              <v-subheader inset>Technologies I like to use</v-subheader>
              <div class="text-xs-center">
                <v-chip
                  v-for="(item, i) in tech_tags"
                  :key="i"
                  :color="item.color"
                  text-color="white"
                >
                  <v-avatar :color="item.color">
                    <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    <img v-else :src="item.url" />
                  </v-avatar>
                  {{ item.name }}
                </v-chip>
              </div>
            </div>
            <div column align-center my-4 mx-3>
              <v-subheader inset>Experience</v-subheader>
              <v-list dense>
                <div v-for="(item, i) in past_projects" :key="i">
                  <v-list-item @click="handleNav(item.site)">
                    <v-list-item-avatar :color="item.color">
                      <v-icon v-if="item.icon" :color="item.iconColor">
                        {{ item.icon }}
                      </v-icon>
                      <img v-else :src="item.url" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title> {{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        Company- {{ item.company }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list>
            </div>
          </v-card>
        </v-flex>
        <!-- Right card -->
        <v-flex d-flex xs12 sm5 md4 lg4>
          <v-card id="right_card" class="pad_card">
            <v-layout mt-4 column align-center>
              <p class="headline">Personal</p>
            </v-layout>

            <div column align-center my-4 mx-3>
              <v-subheader >Info</v-subheader>
              <v-list dense>
                <div v-for="(item, i) in info" :key="i">
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon medium v-if="item.icon" :color="item.color">
                        {{ item.icon }}
                      </v-icon>
                      <img v-else :src="item.url" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title> {{ item.title }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.info }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div v-for="(item, j) in contact_methods" :key="j">
                  <v-list-item @click="handleNav(item.site)">
                    <v-list-item-avatar>
                      <v-icon v-if="item.icon" :color="item.color">
                        {{ item.icon }}
                      </v-icon>
                      <img v-else :src="item.url" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title> {{ item.title }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.id_name }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list>
            </div>
            <div column align-center my-4 mx-3>
              <v-subheader >Hobbies</v-subheader>
              <div class="text-xs-center">
                <v-chip
                  v-for="(item, i) in hobbies"
                  :key="i"
                  :color="item.color"
                  text-color="white"
                >
                  <v-avatar :color="item.color">
                    <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    <img v-else :src="item.url" />
                  </v-avatar>
                  {{ item.name }}
                </v-chip>
              </div>
            </div>

            <div column align-center my-4 mx-3>
              <v-subheader inset>Unsolicited Recommendations</v-subheader>

              <v-list dense>
                <div v-for="(item, i) in recommendations" :key="i">
                  <v-list-item @click="handleNav(item.site)">
                    <v-list-item-avatar>
                      <v-icon v-if="item.icon" :color="item.color">
                        {{ item.icon }}
                      </v-icon>
                      <img v-else :src="item.url" />
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title> {{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.description }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      rightDrawer: false,
      title: 'About me',
      author: 'David Wayne',
      author_blog_url: 'https://9takes.com/blog',
      author_avatar: {
        url: 'https://9takes.com/',
        alt: '',
      },
      tech_tags: [
        { url: './vue.js_Logo.svg', name: 'Vue', color: '#484545' },
        { icon: 'mdi-nodejs', name: 'Node', color: '#026e00' },
        {
          url: './glyph-elastic-cluster-color.svg',
          name: 'Elastic Search',
          color: '#484545',
        },
        { url: './nuxtjs-icon.svg', name: 'Nuxt', color: '#484545' },
        {
          icon: 'mdi-language-typescript',
          name: 'Typescript',
          color: '#3178c6',
        },
        { icon: 'mdi-graphql', name: 'GraphQl', color: '#e00097' },
        { url: './python-logo.svg', name: 'Python', color: '#484545' },
      ],
      past_projects: [
        {
          icon: '9',
          name: '9takes, site for personaliy enthusiasts',
          company: 'Side Project',
          color: '#f72585',
          iconColor: '#191970',
          site: 'https://9takes.com/',
        },
        {
          url: './c4lg.png',
          name: 'Military Lawyer Case Management System',
          company: 'C4 Planning Solutions',
          color: '',
          site: 'https://www.c4plans.com/',
        },
        {
          url: './WTI.png',
          name: 'Data Vis App for Intel Analysts',
          company: 'WTI Solutions',
          color: '#2f3b47',
          site: 'https://www.wti-solutions.com/',
        },
        {
          url: './metrostar.png',
          name: 'Rebuilt/ Modernized data.census.gov',
          company: 'MetroStar Systems ',
          color: '#02cdf7',
          site: 'https://www.metrostar.com/',
        },
        {
          url: './sabio.jpg',
          name: 'Internal Development',
          company: 'Sabio',
          site: 'https://sabio.la/',
        },
        {
          url: './ymc.png',
          name: 'Mentor and Mentee Organization Site',
          company: 'Youth Mentoring Connection',
          color: '#150b0b',
          site: 'https://youthmentoring.org/',
        },
      ],
      hobbies: [
        { url: './usmc.svg', name: 'USMC Vet', color: 'green' },
        {
          icon: 'mdi-human-male-female-child',
          name: 'Dad',
          color: 'indigo',
        },
        { icon: 'mdi-gamepad', name: 'Hacker', color: 'red' },
        { url: './enneagram.svg', name: 'Enneagram 8', color: 'orange' },
        { icon: 'mdi-chef-hat', name: 'Chef', color: 'blue' },
        { url: './ss.png', name: '', color: '' },
      ],
      info: [
        {
          icon: 'mdi-city',
          title: 'Home',
          info: 'Glen Burnie, MD',
          color: 'brown',
        },
        {
          icon: 'mdi-cellphone',
          title: 'Phone #',
          info: '410*******',
          color: 'black',
        },
        {
          icon: 'mdi-email',
          title: 'Email',
          info: 'd*****mail.com',
          color: 'blue',
        },
      ],
      recommendations: [
        {
          icon: 'mdi-walk',
          name: 'Walk',
          type: 'lifestyle',
          description: 'Go for a walk, it helps ya slowdown and think',
          color: '#191970',
          site: '',
        },
        {
          icon: 'mdi-fencing',
          name: 'Listen before you talk',
          type: 'fighting well',
          description:
            'Seek first to understand, then to be understood. Especially in an argument.',
          color: '#191970',
          site: '',
        },
        {
          icon: 'mdi-account-cowboy-hat',
          name: 'Learn about body language',
          type: 'lifestyle',
          description:
            "Next time you are in a social situation, observe and factor in people's body language.",
          color: '#191970',
          site: '',
        },
      ],
      contact_methods: [
        {
          icon: 'mdi-github',
          title: 'GitHub',
          id_name: '@Wolverine971',
          site: 'https://github.com/Wolverine971',
          color: 'black',
        },
        {
          icon: 'mdi-youtube',
          title: 'Youtube',
          id_name: '@D.J. Wayne',
          site: 'https://www.youtube.com/channel/UC_EesxWyjTmqeDGGEhPFGvg',
          color: 'red',
        },
        {
          icon: 'mdi-twitter',
          title: 'Twitter',
          id_name: '@djwayne3',
          site: 'https://twitter.com/djwayne3',
          color: 'blue',
        },
        {
          icon: 'mdi-instagram',
          url: './instagram.svg',
          title: 'Instagram',
          id_name: '@djwayne3',
          site: 'https://www.instagram.com/djwayne3/',
          color: '#833AB4',
        },
      ],
    }
  },
  methods: {
    handleNav(url) {
      //   window.location.replace(url)
      window.open(url, '_blank')
    },
  },
}
</script>
<style scoped>
.pad_card {
  padding: 10px;
}
.statement {
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  line-height: 1rem !important;
}
</style>