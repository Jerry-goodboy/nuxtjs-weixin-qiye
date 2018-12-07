<template>

  <div>
    <div v-if="inputSearchBoxIsShow" class="cs-dd-search-box">

      <el-autocomplete
        v-model="searchInput"
        :fetch-suggestions="querySearch"
        :placeholder="placeholderText"
        @select="handleSelectSearch"
        @change.native="handleChangeSearch"
      ></el-autocomplete>

      <el-button class="cs-search-btn-alone" type="primary" plain icon="el-icon-search" @click="search"></el-button>

    </div>
    <div v-if="classifiedSearchBoxIsShow" class="cs-dd-menu">

      <el-menu
        router
        :default-active="$route.path"
        class=""
        mode="horizontal"
        background-color="#fff"
        text-color="#333"
        active-text-color="#333"
        @select="handleSelect"
        >

        <el-menu-item index="/test/test/">
          <svg class="icon-custom" aria-hidden="true">
            <use xlink:href="#el-icon-test"></use>
          </svg>
          <span>test</span>
        </el-menu-item>

      </el-menu>
      
    </div>

    <nuxt/>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        placeholderText: "",
        searchEventName: "",
        searchInput: "",
        searchValue: "",
        searchValueCompany: "",
        searchResults: [],
        classifiedSearchBoxIsShow: true,
        inputSearchBoxIsShow: true
      }
    },
    mounted() {
      this.setVars()
    },
    methods: {
      handleChangeSearch(){
        this.searchValue = ""
        this.searchValueCompany = ""
      },
      querySearch(queryString, cb) {
        var searchResults = this.searchResults;
        var results = queryString ? searchResults.filter(this.createFilter(queryString)) : searchResults;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (searchResult) => {
          return (searchResult.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      loadSearchResults(module) {
        this.searchResults = []

        if (module == "test") {
          axios
          .get(apiPathWin.queryQiyeList)
          .then((res) => {
            if (res.data.result.length > 0) {
              this.searchResults = res.data.result
            }
          })
        }

      },
      handleSelectSearch(item) {
        this.searchValue = item.label
        this.searchValueCompany = item.company
      },
      handleSelect(routePath, routePathObj){

        if(window.vueCustomRoutePath == routePath) {
          window.location.reload()
        }else {
          clearInterval(window.gpsInterval)
          this.setVars(routePath)
        }

        window.winPurgeGeos()

      },
      setVars(routePath){
        if (!!routePath) {
          window.vueCustomRoutePath = routePath
        }

        this.inputSearchBoxIsShow = true

        if (window.vueCustomRoutePath == "/test/test/" ) {
          this.searchInput = ""
          this.searchValue = ""
          this.placeholderText = "请输入名称"
          this.searchEventName = "search-event-test"
          this.loadSearchResults("test")
        }
      },
      focusInput(){
        this.classifiedSearchBoxIsShow = true
      },
      search(){

        var rulerDom = L.DomUtil.get("cs_id_ruler")
        rulerDom.click()

        if (_.trim(this.searchValue) == "") {
          window.vueCustomEventHub.$emit(this.searchEventName, _.trim(this.searchInput))
        }else {
          window.vueCustomEventHub.$emit(this.searchEventName, _.trim(this.searchValue), _.trim(this.searchValueCompany))
        }
        
      }
    }
  }
</script>

<style>

  .cs-search-btn-alone {
    position: absolute!important;
    right: 0px!important;
    height: 40px!important;
    border-radius: 0 4px 4px 0!important;
  }

  .cs-search-btn-alone:hover,
  .cs-search-btn-alone:focus,
  .cs-search-btn-alone:active {
    background: #b6d7fb!important;
    border-color: #b6d7fb!important;
  }

  .el-popper[x-placement^=bottom] {
    margin-top: 0px!important;
  }

  .el-popper[x-placement^=bottom] .popper__arrow {
    display: none!important;
  }

  .cs-dd-search-box {
    position: absolute;
    top: 15px;
    left: 30px;
    z-index: 100000;
    width: 303px;
  }

  .cs-dd-search-box .el-autocomplete,
  .cs-dd-search-box .el-input__inner {
    width: 303px;
  }

  .cs-dd-search-box .el-input.is-active .el-input__inner, 
  .cs-dd-search-box .el-input__inner:focus {
    border-color: #b3d8ff!important;
  }

  .cs-dd-menu {
    position: absolute;
    top: 55px;
    left: 30px;
    z-index: 100000;
    background: #fff;
    width: 300px;
    border: 1px solid #f0f0f0;
  }

  .cs-dd-menu [class*=" el-icon-"],
  .cs-dd-menu [class^=el-icon-] {
    color: #409eff!important;
  }

  .el-menu--horizontal>.el-menu-item {
    width: 100px;
  }

  .el-menu--horizontal>.cs-el-menu-item {
    width: 125px;
  }

  .el-menu--horizontal>.el-menu-item,
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px!important;
    line-height: 40px!important;
  }

  .el-menu--horizontal>.el-menu-item.is-active,
  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom: 0px solid #f0f0f0!important;
  }

  .el-menu--horizontal>.el-menu-item.is-active,
  .el-submenu__title:hover,
  .el-menu-item:hover,
  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
  .el-menu--horizontal .el-menu .el-menu-item.is-active,
  .el-menu--horizontal .el-menu .el-submenu__title.is-active {
    background-color: #f0f0f0!important;
    font-size:15px!important;
  }

</style>
