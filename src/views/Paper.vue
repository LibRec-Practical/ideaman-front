<template>
  <div>
    <Row>
      <i-col span="24">
        <a :href="paper.link" target="_blank">
          <h1>{{ paper.title }}</h1>
        </a>
        <p>
          作者:
          <Button v-for="a in paper.authors" :key="a" type="text">{{
            a
          }}</Button>
        </p>
      </i-col>
    </Row>
    <Divider />
    <Row class="row-distance" style="min-height: 100px">
      <i-col span="18">
        <p>
          标签:
          <Button
            v-for="t in paper.tags"
            :key="t"
            type="text"
            icon="md-pricetag"
            >{{ t }}</Button
          >
        </p>
        <p>关键词: {{ keywordsLine }}</p>
      </i-col>
      <i-col span="6">
        <div class="operation-buttons">
          <div class="button-box">
            <Button
              class="button-width-fixed"
              icon="md-cloud-download"
              @click="onDownloadTapped"
              >下载</Button
            >
          </div>
          <div class="button-box">
            <Button
              class="button-width-fixed"
              icon="md-star"
              @click="onCollectTapped"
              >收藏</Button
            >
          </div>
          <div class="button-box">
            <Button
              class="button-width-fixed"
              icon="ios-paper"
              @click="onFeedbackTapped"
              >反馈</Button
            >
          </div>
        </div>
      </i-col>
    </Row>
    <Row class="row-distance">
      <i-col span="24">
        <h1>摘要</h1>
        <Divider />
        <p>{{ paper.abstract }}</p>
        <img
          style="margin-top: 10px"
          :src="thumbnailURL"
          alt="Paper Thumbnails"
        />
      </i-col>
    </Row>
    <Row class="row-distance">
      <i-col span="24">
        <h1>猜你喜欢</h1>
        <!-- <div class="box-in-detail">登陆后可查看（该服务暂未开启）</div> -->
        <div class="box-in-detail">
          <PaperRelatedRecs :papers="relatedPapers" />
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import paperSample from "@/assets/1806.07822v2.pdf.jpg";
import {
  getPaperInfo as getPaperInfoApi,
  getRelatedPaper as getRelatedPaperApi,
} from "../api/paper";
import { addLibrary as addLibraryApi } from "../api/library";
import PaperRelatedRecs from "../components/status/PaperRelatedRecs";
import { sendEventData as sendEventDataApi } from "../utils/dcpRequest";

export default {
  name: "Paper",
  components: {
    PaperRelatedRecs,
  },
  mounted() {
    const paperId = this.$route.params.arxivId;
    this.getPaperInfo(paperId);
    this.getRelatedPaper(paperId);

    sendEventDataApi({
      event_type: "Online",
      event: "$ItemView",
      paperId: paperId,
    });
  },
  data() {
    return {
      paper: {},
      relatedPapers: [],
      thumbnailURL: paperSample,
    };
  },
  computed: {
    keywordsLine() {
      return this.paper.keywords ? this.paper.keywords.join(", ") : "";
    },
  },
  methods: {
    async getPaperInfo(id) {
      try {
        const res = await getPaperInfoApi({ id });
        if (res.code === 0) {
          this.paper = res.data;
        }
      } catch (e) {
        this.$Message.error(e);
      }
    },

    async getRelatedPaper(paperId) {
      try {
        const res = await getRelatedPaperApi({ paperId });
        console.log("********offline***********");
        console.log(res);
        console.log("*******************");

        if (res.code === 0) {
          this.relatedPaper = res.data;
        }
      } catch (e) {
        this.$Message.error("暂无法获取猜你喜欢离线推荐");
      }
    },
    async onCollectTapped() {
      try {
        const { id } = JSON.parse(window.localStorage.getItem("ideaman_info"));

        const res = await addLibraryApi({ userId: id, paperId: this.paper.id });
        console.log(res);
        if (res.code === 0) {
          this.$Message.success("收藏成功");
        } else {
          this.$Message.error(res.message);
        }
      } catch (e) {
        this.$Message.error(e);
      }
    },
    async onDownloadTapped() {
      console.log(
        this.paper.link.split("/")[this.paper.link.split("/").length - 1]
      );
      const pdfLink =
        "http://arxiv.org/pdf/" +
        this.paper.link.split("/")[this.paper.link.split("/").length - 1];
      window.open(pdfLink, "_blank");
    },
    async onFeedbackTapped() {
      this.$Message.success("点击反馈,暂不支持该服务");
    },
  },
};
</script>

<style scoped>
@import "../styles/commons.css";

.operation-buttons {
  position: absolute;
  right: 0;
}

.button-box {
  margin-bottom: 5px;
}

.button-width-fixed {
  width: 100%;
}
</style>
