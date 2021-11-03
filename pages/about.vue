<template>
  <v-container fluid grid-list-md>
    <password-protect />
    <v-layout row wrap justify-center v-if="isAuthenticated">
      <!-- Left card -->
      <v-flex d-flex xs12 sm5 md4 lg4>
        <v-card class="pad_card">
          <v-layout mt-4 column align-center>
            <p class="headline">Professional</p>
          </v-layout>
          <div column align-center my-4 mx-3>
            <v-subheader>Statement</v-subheader>
            <div class="text-xs-center statement" style="white-space: pre-line">
              I was a veteran, but it is tech that I am better in,
              I have an entrepreneurial spirit, and work with me and you will hear it,
              I work up and down the stack, if you need something done on me you can always fall back,
              I enjoy learning about systems and coming up with efficient solutions, 
              I seek to impress those around me with my creative contributions, 
              I will gain the respect of everyone I meet, even the confucians.
            </div>
          </div>
          <div column align-center my-4 mx-3>
            <v-subheader>Technologies I like to use</v-subheader>
            <div class="text-xs-center">
              <v-chip
                v-for="(tTag, i) in tech_tags"
                :key="i + 'c'"
                :color="tTag.color"
                text-color="white"
              >
                <v-avatar :color="tTag.color">
                  <v-icon v-if="tTag.icon">{{ tTag.icon }}</v-icon>
                  <img v-else :src="tTag.url" />
                </v-avatar>
                {{ tTag.name }}
              </v-chip>
            </div>
          </div>
          <div column align-center my-4 mx-3>
            <v-subheader class="margin-top">Experience</v-subheader>
            <v-list dense>
              <v-list-item
                @click="handleNav(proj.site)"
                v-for="(proj, i) in past_projects"
                :key="i + 'c'"
              >
                <v-list-item-avatar :color="proj.color">
                  <v-icon v-if="proj.icon" :color="proj.iconColor">
                    {{ proj.icon }}
                  </v-icon>
                  <img v-else :src="proj.url" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title> {{ proj.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Company- {{ proj.company }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-flex>
      <!-- Right card -->
      <v-flex d-flex xs12 sm5 md4 lg4>
        <v-card class="pad_card">
          <v-layout mt-4 column align-center>
            <p class="headline">Personal</p>
          </v-layout>
          <div column align-center my-4 mx-3>
            <v-subheader>Info</v-subheader>
            <v-list dense>
              <v-list-item v-for="(info, i) in infos" :key="i + 'i'">
                <v-list-item-avatar>
                  <v-icon medium v-if="info.icon" :color="info.color">
                    {{ info.icon }}
                  </v-icon>
                  <img v-else :src="info.url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title> {{ info.title }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ info.info }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-for="(contact, j) in contact_methods"
                :key="j + 'j'"
                @click="handleNav(contact.site)"
              >
                <v-list-item-avatar>
                  <v-icon v-if="contact.icon" :color="contact.color">
                    {{ contact.icon }}
                  </v-icon>
                  <img v-else :src="contact.url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title> {{ contact.title }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ contact.id_name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div column align-center my-4 mx-3>
            <v-subheader class="margin-bot">Tags</v-subheader>
            <div class="text-xs-center">
              <v-chip
                v-for="(tag, i) in personal_tags"
                :key="i + 'p'"
                :color="tag.color"
                text-color="white"
              >
                <v-avatar :color="tag.color">
                  <v-icon v-if="tag.icon">{{ tag.icon }}</v-icon>
                  <img v-else :src="tag.url" />
                </v-avatar>
                {{ tag.name }}
              </v-chip>
            </div>
          </div>

          <div column align-center my-4 mx-3>
            <v-subheader class="margin-top">
              Unsolicited Recommendations
            </v-subheader>
            <v-list dense>
              <v-list-item
                @click="handleNav(rec.site)"
                v-for="(rec, i) in recommendations"
                :key="i + 'r'"
              >
                <v-list-item-avatar>
                  <v-icon v-if="rec.icon" :color="rec.color">
                    {{ rec.icon }}
                  </v-icon>
                  <img v-else :src="rec.url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title> {{ rec.name }}</v-list-item-title>
                  <v-list-item-subtitle class="wrap">
                    {{ rec.description }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {
    PasswordProtect:()=> import('../components/passwordProtect.vue')
  },
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
          url: './9.PNG',
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
        {
          url: './usmc.svg',
          name: 'USMC Scout Sniper',
          company: 'USMC',
          color: '#f72585',
          iconColor: '#191970',
          site: 'https://en.wikipedia.org/wiki/United_States_Marine_Corps_Scout_Sniper',
        },
      ],
      personal_tags: [
        {
          icon: 'mdi-human-male-female-child',
          name: 'Dad',
          color: 'grey',
        },
        { icon: 'mdi-arrow-collapse', name: 'Contrarian', color: 'black' },
        { url: './enneagram.svg', name: 'Enneagram 8', color: 'grey' },
        { icon: 'mdi-chef-hat', name: 'Chef', color: 'black' },
        { url: './ss.png', name: '', color: 'grey' },
      ],
      infos: [
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
      peopleILike: [
        { name: 'Naval' },
        { name: 'Tim Ferris' },
        { name: 'Peter Thiel' },
        { name: 'Eric Weinstein' },
        { name: 'Elon Musk' },
        { name: 'Nassim Taleb' },
        { name: 'Robert Greene' },
        { name: 'Peter Zeihan' },
        { name: 'James Altucher' },
        { name: 'Josh Waitzkin' },
      ],
    }
  },
  methods: {
    handleNav(url) {
      //   window.location.replace(url)
      window.open(url, '_blank')
    },
  },
  computed: {
    isAuthenticated(){
      return this.$store.getters.authenticated
    }
  },
  head() {
    return {
      titleTemplate: "About DJ",
      title: "DJ's About Page",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "DJ's Resume",
        },
        {
          property: 'og:url',
          content: 'https://djandnicktalkaboutstuff.com/about',
        },
        {
          property: 'og:description',
          content: "DJ's Resume",
        },
        { property: 'og:title', content: "DJ's About Page" },
        {
          name: 'twitter:description',
          content: "DJ's Resume",
        },
        {
          name: 'twitter:title',
          content: "DJ's About Page",
        },
        {
          name: 'keywords',
          content:
            'DJ, jobs, career, poem, technology',
        },
      ],
      link: [
        { rel: 'icon', hid: 'icona', type: 'image/x-icon', href: '/information.png' },
        {
          rel: 'canonical',
          href: 'https://djandnicktalkaboutstuff.com/about',
        },
      ],
    }
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
.wrap {
  white-space: inherit;
}
.margin-top {
  margin-top: 10px;
}
.margin-bot {
  margin-bottom: 10px;
}
</style>