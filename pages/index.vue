<template>
  <div class="pb-16">
    <!-- Header -->
    <div class="bg-forest-night pt-16 pb-16 sm:pb-24">
      <div class="pb-10 text-center px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center">
          <IconNuxt alt="Nuxt" />
        </div>
        <h1 class="mt-4 text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
          Explore Nuxt Modules
        </h1>
        <p class="max-w-xl mt-5 mx-auto text-lg sm:text-xl leading-7 text-rainy-grey">
          Discover our list of modules to supercharge your <a href="https://nuxtjs.org" rel="noopener" target="_blank" class="border-b border-stone-green hover:text-green-500 hover:border-green-600">Nuxt project</a>. Created by the Nuxt team and community.
        </p>
        <div class="max-w-xl mt-2 mx-auto text-center">
          <a href="https://github.com/nuxt/modules" rel="noopener" target="_blank" class="text-md leading-4 items-center space-x-1 text-grey-light border-b border-stone-green hover:text-green-500 hover:border-green-600">
            Contribute on GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="relative -mt-16 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
          <div class="flex justify-center sm:flex-col border-b border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-r">
            <dt id="item-1" class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize">
              modules
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-700" aria-describedby="item-1">
              {{ modules.length }}
            </dd>
          </div>
          <div class="flex justify-center sm:flex-col border-t border-b border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-l sm:border-r">
            <dt class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize">
              downloads last 30 days
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-700">
              {{ numberFormat(downloads) }}
            </dd>
          </div>
          <div class="flex justify-center sm:flex-col border-t border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-l">
            <dt class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize">
              maintainers
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-700">
              {{ maintainersTotal }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Search and filters -->
    <div class="pt-12 pb-8 container mx-auto px-4 sm:px-0">
      <!-- Search -->
      <div class="sm:max-w-lg sm:mx-auto flex shadow-sm">
        <label class="flex-1"><input v-model="q" type="search" aria-label="Search" class="w-full appearance-none block p-3 text-base leading-6 placeholder-gray-500 border border-rainy-grey rounded-tl-md rounded-bl-md focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-green transition duration-150 ease-in-out sm:flex-1" placeholder="Search a module (name, category, username, etc.)"></label>
        <button type="button" aria-label="search" class="px-6 py-3 bg-rainy-grey hover:bg-grey-light focus:bg-grey-light text-gray-700 text-base leading-6 font-medium rounded-tr-md rounded-br-md focus:outline-none focus:shadow-outline-green transition duration-150 ease-in-out sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
          <IconSearch alt="Search" />
        </button>
      </div>
      <!-- Categories -->
      <div class="flex sm:flex-wrap space-x-2 sm:justify-center pt-6 overflow-x-auto">
        <button
          v-for="category of categories"
          :key="category"
          type="button"
          class="px-4 py-2 text-sm rounded focus:outline-none mb-2 cursor-pointer"
          :class="[ selectedCategory === category ? 'bg-forest-night text-white' : 'text-forest-night bg-rainy-grey hover:bg-grey-light focus:bg-grey-light']"
          @click="toggleCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Modules list -->
    <div class="container mx-auto px-4 sm:px-0">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <!-- Clear filters -->
        <p class="mb-4 text-forest-night">
          {{ filteredModules.length }} module{{ filteredModules.length !== 1 ? 's' : '' }} found
          <template v-if="selectedCategory || q">
            <p>
              Filter{{ selectedCategory && q ? 's' : '' }}:
              <b>{{ selectedCategory }}</b>{{ selectedCategory && q ? ', ' : '' }}<b>{{ q }}</b>
              <a href="/" class="hover:text-grey-darkest" @click.prevent="clearFilters">(<u>clear filter{{ selectedCategory && q ? 's' : '' }}</u>)</a>
            </p>
          </template>
        </p>
        <div v-show="!q" class="mb-4 text-forest-night flex items-center">
          <label for="options-menu" class="mr-3" @click="sortByMenuVisible = !sortByMenuVisible">Sort by</label>
          <div class="relative w-28">
            <button
              type="button"
              class="border px-2 justify-center p-1 rounded-l-md hover:bg-rainy-grey focus:bg-rainy-grey focus:outline-none flex items-center hover:border-grey-light w-full"
              :class="sortByBtnClass"
              @click="sortByMenuVisible = !sortByMenuVisible"
            >
              {{ sortByComp.label }}
            </button>
            <div v-show="sortByMenuVisible" class="origin-top-right absolute right-0 rounded-md shadow-lg z-10">
              <div id="options-menu" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  v-for="(option, key) in sortByOptions"
                  :key="key"
                  type="button"
                  class="w-28 flex justify-center px-2 p-1 hover:bg-cloudy-grey focus:text-grey-darkest text-forest-night focus:outline-none items-center rounded-b-md bg-white shadow-xs"
                  @click="selectSortBy(key)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>
          <div class="relative">
            <button
              type="button"
              class="p-2 border-l-0 hover:bg-rainy-grey focus:bg-rainy-grey focus:outline-none flex items-center border rounded-r-md"
              @click="toggleOrderBy"
            >
              <icon-order-by :is-asc="orderBy === 'asc'" class="fill-current w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <!-- Module cards -->
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div v-for="module of filteredModules" :key="module.name" class="relative flex flex-col bg-white transform transition-transform duration-150 ease-in-out shadow rounded-md overflow-hidden hover:shadow-lg hover:-translate-y-1">
          <div class="relative flex flex-1 flex-col space-y-2 px-6 py-8 group">
            <a :href="module.website" :aria-label="module.website" target="_blank" rel="noopener" class="absolute inset-0" />
            <div class="transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 absolute top-4 right-6 cursor-pointer">
              <img alt="website" src="~/assets/icons/ext.svg" width="24" height="24">
            </div>

            <nuxt-image
              v-if="!iconUrl(module).includes('.svg')"
              legacy
              :src="iconUrl(module)"
              :alt="module.name"
              class="w-10 h-10"
              width="40px"
              height="40px"
            />
            <img
              v-else
              :src="iconUrl(module)"
              :alt="module.name"
              class="w-10 h-10"
              width="40px"
              height="40px"
            >

            <h2 class="flex text-2xl items-center pt-2">
              <span>{{ module.name }}</span>
              <img
                v-if="module.type === 'official'"
                alt="official"
                src="~/assets/icons/official.svg"
                width="20"
                height="20"
                class="ml-1 mt-1"
              >
            </h2>
            <p class="text-gray-500 group-hover:text-gray-800">
              {{ module.description }}
            </p>
          </div>
          <div class="border-t border-gray-200 bg-gray-100 grid grid-cols-3">
            <a :href="npmUrl(module)" aria-label="npm" target=" _blank" rel="noopener" class="stats-block group flex items-center space-x-2 border-r border-gray-200 hover:bg-gray-200 hover:bg-opacity-50 py-3 px-4 pl-6">
              <img alt="npm" src="~/assets/icons/npm.svg" width="32" height="32" class="icon">
              <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium">{{ numberFormat(module.downloads) }}</div>
            </a>
            <a :href="module.github" aria-label="stars" target=" _blank" rel="noopener" class="stats-block group flex items-center space-x-1 py-3 px-4 border-r border-gray-200 hover:bg-gray-200 hover:bg-opacity-50">
              <img alt="stars" src="~/assets/icons/star.svg" width="20" height="20" class="icon">
              <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium truncate">{{ numberFormat(module.stars) }} <span class="hidden md:inline-block">star{{ module.stars !== 1 ? 's' : '' }}</span></div>
            </a>
            <div class="stats-block group flex items-center space-x-1 py-3 px-4 z-0 overflow-hidden hover:bg-gray-200 hover:bg-opacity-50">
              <img alt="maintainer" src="~/assets/icons/maintainer.svg" width="20" height="20" class="icon mr-1">
              <a
                v-for="maintainer of module.maintainers"
                :key="maintainer.github"
                v-tooltip="{ content: maintainer.github, classes: ['bg-forest-night', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm'] }"
                :aria-label="maintainer.github"
                :href="githubUrl(maintainer)"
                target="_blank"
                rel="noopener"
              >
                <img class="relative inline-block rounded-full text-white shadow-solid transition-opacity duration-200 opacity-75 group-hover:opacity-100" :src="maintainer.avatar + '&s=24'" :alt="maintainer.name" width="24" height="24">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="container mx-auto flex flex-col justify-center pt-12 text-stone-green items-center">
      <p>For more information on Nuxt modules, including how to create a module, check out our <a href="https://nuxtjs.org/guides/directory-structure/modules" rel="noopener" target="_blank" class="text-md leading-4 items-center space-x-1 text-grey border-b border-stone-green hover:text-green-500 hover:border-green-600">docs</a>.</p>
      <div class="flex justify-center px-4 sm:px-0 pt-6 space-x-2">
        <a href="https://vercel.com" rel="noopener" target="_blank" aria-label="go to vercel">
          <IconVercel alt="Vercel" />
        </a>
        <a href="https://nuxtjs.org" rel="noopener" target="_blank" aria-label="go to nuxt">
          <IconWithNuxt alt="Nuxt" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import millify from 'millify'
import Fuse from 'fuse.js/dist/fuse.basic.esm'
import categories from '~/categories'

const createKeyVal = (key, val) => val ? { [key]: val } : {}

const sort = (a, b, asc) => asc ? a - b : b - a

const ORDERS = {
  DESC: 'desc',
  ASC: 'asc'
}

const FIELDS = {
  DOWNLOADS: 'downloads',
  STARS: 'stars'
}

const sortFields = {
  [FIELDS.DOWNLOADS]: {
    label: 'Downloads'
  },
  [FIELDS.STARS]: {
    label: 'Stars'
  }
}

export default {
  directives: {
    focus: {
      // directive definition
      inserted (el) {
        el.focus()
      }
    }
  },
  async asyncData ({ $content }) {
    const modules = await $content().sortBy(FIELDS.DOWNLOADS, ORDERS.DESC).fetch()
    const maintainers = []
    let downloads = 0

    modules.forEach((module) => {
      downloads += (module.downloads || 0)
      module.maintainers.forEach((maintainer) => {
        if (!maintainers.find(m => m.name === maintainer.name)) {
          maintainers.push(maintainer)
        }
      })
    })

    return {
      modules,
      categories,
      maintainersTotal: maintainers.length,
      downloads
    }
  },
  data () {
    return {
      q: '',
      orderBy: ORDERS.DESC,
      sortBy: 'downloads',
      sortByMenuVisible: false,
      selectedCategory: null
    }
  },
  computed: {
    filteredModules () {
      let modules = this.modules
      if (this.q) {
        modules = this.fuse.search(this.q).map(r => r.item)
      } else {
        // Sort only if no search
        modules.sort((a, b) => sort(a[this.sortBy], b[this.sortBy], this.orderBy === ORDERS.ASC))
      }
      if (this.selectedCategory) {
        modules = modules.filter(module => module.category === this.selectedCategory)
      }

      return modules
    },
    sortByComp () {
      return sortFields[this.sortBy]
    },
    sortByOptions () {
      const options = {}

      for (const key in sortFields) {
        if (key === this.sortBy) { continue }

        options[key] = {
          ...sortFields[key]
        }
      }

      return options
    },
    sortByBtnClass () {
      return this.sortByMenuVisible ? 'rounded-bl-none border-b-grey-light' : ''
    }
  },
  watch: {
    selectedCategory (value) {
      this.syncURL()
    },
    q () {
      this.syncURL()
    },
    orderBy () {
      this.syncURL()
    },
    sortBy () {
      this.syncURL()
    }
  },
  async mounted () {
    const fuseOptions = {
      threshold: 0.1,
      keys: [
        'name',
        'npm',
        'category',
        'maintainers.name',
        'maintainers.github',
        'description',
        'repo'
      ]
    }
    const index = Fuse.createIndex(fuseOptions.keys, this.modules)
    this.fuse = new Fuse(this.modules, fuseOptions, index)

    const selectedCategory = (window.location.hash || '').substr(1)
    if (selectedCategory) {
      this.toggleCategory(selectedCategory)
    }
    const { q, sortBy, orderBy } = this.$route.query
    if (q) {
      this.q = q
    }

    if (sortBy) {
      this.sortBy = sortBy
    }

    if (orderBy) {
      this.orderBy = orderBy
    }
  },
  methods: {
    numberFormat (num, options = { precision: 1 }) {
      return millify(num || 0, options)
    },
    iconUrl ({ name, icon, category }) {
      if (icon) {
        return `/icons/${icon}`
      }
      return `/categories/${category.toLowerCase()}.svg`
    },
    npmUrl ({ npm }) {
      return `https://npmjs.com/package/${npm}`
    },
    githubUrl ({ github }) {
      return `https://github.com/${github}`
    },
    toggleCategory (category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null
        return
      }
      this.selectedCategory = category
    },
    clearFilters () {
      this.selectedCategory = null
      this.q = null
    },
    syncURL () {
      const url = this.$route.path
      let query = ''

      if (this.q) {
        query += `?q=${this.q}`
      }

      if (this.orderBy !== FIELDS.DESC) {
        query += `${query ? '&' : '?'}orderBy=${this.orderBy}`
      }

      if (this.sortBy !== FIELDS.DOWNLOADS) {
        query += `${query ? '&' : '?'}sortBy=${this.sortBy}`
      }

      if (this.selectedCategory) {
        query += `#${this.selectedCategory}`
      }

      window.history.pushState('', '', `${url}${query}`)
    },
    toggleOrderBy () {
      this.orderBy = (this.orderBy === ORDERS.ASC) ? ORDERS.DESC : ORDERS.ASC
    },
    selectSortBy (field) {
      this.sortBy = field
      this.sortByMenuVisible = false
    }
  },
  head () {
    const title = 'Explore Nuxt Modules'
    const description = 'Discover our list of modules to supercharge your Nuxt project. Created by the Nuxt team and community.'
    const url = 'https://modules.nuxtjs.org'

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:site_name', property: 'og:site_name', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:image', property: 'og:image', content: `${url}/preview.png` },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@nuxt_js' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: `${url}/preview.png` },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: title }
      ]
    }
  }
}
</script>

<style scoped>
.stats-block {
  & img {
    filter: grayscale(100%);
    &.icon {
      filter: grayscale(100%) contrast(0%);
    }
  }
  &:hover {
    & img {
      filter: none;
      &.icon {
        filter: none;
      }
    }
  }
}
</style>
