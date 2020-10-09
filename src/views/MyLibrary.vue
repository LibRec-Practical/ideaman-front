<template>
  <div class="container">
    <div class="left">
      <Table
        border
        stripe
        :columns="paperTableColumns"
        :show-header="true"
        :data="nowData"
        @on-row-click="showPaperDetail"
      ></Table>
      <Page
        :total="dataCount"
        :page-size="pageSize"
        @on-change="changepage"
        @on-page-size-change="_nowPageSize"
        show-total
        show-sizer
        show-elevator
      />
    </div>
    <div class="right">
      <!-- 右部分：当前点击的论文详情 -->
      <Card v-show="closeDetailFlag">
        <!-- 卡片头部 -->
        <div slot="title">
          <a style="color:black;" @click="closeDetail">
            <Icon type="md-close" />
          </a>
          <a style="margin-left:10px;color:black;">论文详情</a>
        </div>
        <!-- 论文内容 -->
        <div>
          <!-- 标题 -->
          <h3>{{ currentPaper.title }}</h3>
          <!-- 作者们 -->
          <p style="margin-top: 10px;">
            {{
            authorsLine(currentPaper.authors) }}
          </p>
          <!-- 标签 -->
          <p style="margin-top: 10px;">
            <Icon type="md-pricetag" style="margin-right: 10px;" />
            <Tag v-for="t in currentPaper.tags" :key="t">{{ t }}</Tag>
          </p>
          <!-- 摘要 -->
          <p style="margin-top: 10px;">{{ currentPaper.abstract }}</p>
          <!-- 论文PDF 缩略图 -->
          <img :src="samplePaper" alt="Paper Thumbnails" style="max-width: 100%; margin-top: 10px;" />
          <!-- 关键词 -->
          <p style="margin-top: 10px;">
            关键词：{{
            keywordsLine(currentPaper.keywords)
            }}
          </p>
          <Divider />
          <!-- 引用数据 -->
          <p>引用数据：</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import paperSample from '@/assets/1806.07822v2.pdf.jpg'

import {
  getLibrary as GetLibraryApi,
  // addLibrary as AddLibraryApi,
  // updateLibrary as UpdateLibraryApi,
  deleteLibrary as DeleteLibraryApi
} from '../api/library'

export default {
  name: 'MyLibrary',
  data () {
    return {
      // 分页
      nowData: [],
      pageSize: 10, // 每页显示多少条
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
      // 删除
      paper_id: [],

      currentIndex: 0,
      currentPaper:
      {
        title: '',
        authors: [],
        tags: [],
        abstract: '',
        keywords: []
      },
      closeDetailFlag: true,
      modifyMode: false,
      samplePaper: paperSample,
      papers: [],
      paperTableColumns: [
        {
          title: 'ID',
          key: 'id',
          width: '100px',
          fixed: 'left'
        },
        {
          title: '类型',
          key: 'type',
          width: '100px',
          fixed: 'left'
        },
        {
          title: '标题',
          key: 'title',
          width: '400px',
          fixed: 'left'
        },
        {
          title: '关键词',
          key: 'keywords',
          width: '150px',
          fixed: 'left'
        }
      ]
    }
  },

  mounted () {
    this.getLibrary()
  },

  methods: {
    showPaperDetail (record) {
      this.closeDetailFlag = true
      this.currentPaper = record
    },
    authorsLine (authors) {
      return authors.map((a) => a.name).join(', ')
    },
    keywordsLine (keywords) {
      return keywords.join(', ')
    },
    showDetail (index) {
      this.currentIndex = index
    },
    closeDetail () {
      this.closeDetailFlag = false
    },
    filter (str) {
      if (str === '') {
        this._getData()
        this.changepage(1)
      } else {
        var searchkeyword = new RegExp(str)
        const tmppapers = this.papers
        this.papers = []
        for (let i = 0; i < this.dataCount; i++) {
          var title = '' + tmppapers[i].title
          if (searchkeyword.test(title)) {
            this.papers.push(tmppapers[i])
          }
        }
        this._getData()
        this.changepage(1)
        this.papers = tmppapers
      }
    },

    // 获取
    async getLibrary () {
      try {
        const res = await GetLibraryApi()
        if (res.code === 0) {
          this.papers = res.data
          this.currentPaper = this.papers[0]
          this._getData()
        }
      } catch (err) {
        console.log(err)
      }
    },

    // 删除
    async deletelibrary () {
      try {
        const deleteRes = await DeleteLibraryApi({
          id: this.paper_id,
          deleted: 0
        })
        if (deleteRes.code === 0) {
          this.getLibrary()
          this.changepage(1)
        }
      } catch (err) {
        console.log(err)
      }
    },

    selectionClick (row) {
      this.paper_id = []
      for (var i = 0; i < row.length; i++) {
        this.paper_id.push(row[i].id)
      }
    },

    export_click () {
      // 发送一个 POST 请求
      const url = '/my_library/download'
      const data = {
        paper_id: this.paper_id
      }

      this.$http
        .post(url, data)
        .then((res) => {
          this.download(res)
        })
        .catch((err) => {
          console.log(err) // 错误信息
        })
    },

    download (resp) {
      if (!resp.data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([resp.data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'log.bib')

      document.body.appendChild(link)
      link.click()
    },

    _getData () {
      // 分页显示所有数据总数
      this.dataCount = this.papers.length
      // 循环展示页面刚加载时需要的数据条数
      for (let i = 0; i < this.pageSize; i++) {
        this.nowData.push(this.papers[i])
      }
    },

    changepage (index) {
      // 需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
      const _start = (index - 1) * this.pageSize
      // 需要显示结束数据的index
      const _end = index * this.pageSize
      // 截取需要显示的数据
      this.nowData = this.papers.slice(_start, _end)
      // 储存当前页
      this.pageCurrent = index
      // 刷新页面

      this.showDetail(0)
    },

    _nowPageSize (index) {
      // 实时获取当前需要显示的条数
      this.pageSize = index
    }
  }
}
</script>

<style scoped>
@import "../styles/commons.css";
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left {
  flex-shrink: 0;
  align-self: flex-start;
}
.right {
  flex-shrink: 1;
  margin-left: 10px;
  align-self: flex-start;
}
.top-button {
  margin-left: 10px;
}
</style>
