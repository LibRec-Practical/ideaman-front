<template>
  <div class="author-page">
    <Row>
      <Col span="20">
        <div class="author-title">
          <h1>{{ name }}</h1>
          <h3>{{ institution }}</h3>
        </div>
        <div class="author-title">
          <Button type="primary" icon="ios-star" class="author-operation-button">Follow</Button>
          <Button icon="ios-paper" class="author-operation-button">Feedback</Button>
        </div>
      </Col>
      <Col span="4">
        <img :src="authorPic" class="author-picture" alt="Author Picture" />
      </Col>
    </Row>
    <Row class="row-distance" style="min-height: 200px">
      <Col span="8" class="box-introduction-left">
        <h1>Interest</h1>
        <div class="box-in-detail">
          <Button class="interest-tag" v-for="t in interests" :key="t" size="small" type="primary">
            <Icon type="md-pricetag" />
            {{ t }}
          </Button>
        </div>
      </Col>
      <Col span="8" class="box-introduction">
        <h1>Contact</h1>
        <div class="box-in-detail">
          <p>
            <Icon type="ios-call" />
            {{ contacts.telephone }}
          </p>
          <p>
            <Icon type="ios-mail" />
            {{ contacts.email }}
          </p>
        </div>
      </Col>
      <Col span="8" class="box-introduction-right">
        <h1>Relationship</h1>
        <div
          id="authorRelationship"
          ref="authorRelationship"
          class="box-in-detail"
        >Reserved for network.</div>
      </Col>
    </Row>
    <Row class="row-distance">
      <Col span="24">
        <h1>Papers</h1>
        <Table stripe :columns="paperTableColumns" :data="papers" class="box-in-detail"></Table>
      </Col>
    </Row>
    <Row class="row-distance">
      <Col span="24">
        <h1>Recommendations</h1>
        <div class="box-in-detail">Available after login.</div>
      </Col>
    </Row>
  </div>
</template>

<script>
import authorPicture from '@/assets/citations.jpg'

export default {
  name: 'Author',
  data () {
    return {
      name: 'Tanmay Shankar',
      institution: 'School of Computer Science, Carnegie Mellon University',
      authorPic: authorPicture,
      interests: ['cs.LG', 'cs.AI', 'cs.CV', 'cs.RO', 'stat.ML'],
      contacts: {
        telephone: '+1 (412) 537-1968',
        email: 'tanmayshankar@cmu.edu'
      },
      papers: [
        {
          type: 'arXiv',
          id: '0000.00000',
          title:
            'Reinforcement learning via recurrent convolutional neural networks',
          lastUpdate: new Date(2012, 0, 4),
          published: new Date(2012, 0, 4)
        },
        {
          type: 'arXiv',
          id: '0000.00001',
          title: 'Hierarchical Reinforcement Learning for Sequencing Behaviors',
          lastUpdate: new Date(2012, 0, 4),
          published: new Date(2012, 0, 4)
        },
        {
          type: 'arXiv',
          id: '0000.00002',
          title: 'Development of an assistive stereo vision system',
          lastUpdate: new Date(2012, 1, 4),
          published: new Date(2012, 1, 4)
        },
        {
          type: 'arXiv',
          id: '0000.00003',
          title: 'A Hybrid Assistive Wheelchair Exoskeleton',
          lastUpdate: new Date(2012, 1, 4),
          published: new Date(2012, 1, 4)
        }
      ],
      paperTableColumns: [
        {
          title: 'Title',
          key: 'title'
        }
        // {
        //   title: 'Last Updated',
        //   key: 'lastUpdate'
        // },
        // {
        //   title: 'Published',
        //   key: 'published'
        // }
      ]
    }
  }
}
</script>

<style scoped>
@import "../styles/commons.css";

.author-page {
  /**/
}

.author-picture {
  border-radius: 50%;
  width: 100%;
}

.author-title {
  margin: 0 0 10px 0;
}

.interest-tag {
  margin: 0 5px 0 0;
}

.author-operation-button {
  margin: 0 10px 0 0;
}

.box-introduction {
  padding: 0 10px 0 10px;
}

.box-introduction-left {
  padding: 0 10px 0 0;
}

.box-introduction-right {
  padding: 0 0 0 10px;
}
</style>
