const fly = require("./index")

export default {
  //1.获取大分类
  statistics() {
    return fly.get(`/cats/lv2/statistics`)
  },
  //2.获取小类
  getCats() {
    return fly.get(`/cats/lv2`)
  },

  //3.获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
  genders({gender, type, major, minor, start}) {
    if (minor) {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
    } else {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
    }
  },
  //4. 书籍详情
  bookInfo(_id) {
    return fly.get(`/book/${_id}`)
  },
  //5.相关推荐
  relatedRecommendedBooks(_id) {
    return fly.get(`/book/${_id}/recommend`)
  },
  //6.作者名下的书籍
  authorBooks(author) {
    return fly.get(`/book/accurate-search?author=${author}`)
  },
   //7.书源  注意：第一个优质书源为收费源
   bookSources(book_id) {
    return fly.get(`/atoc?view=summary&book=${book_id}`)
  },
   //8.书籍章节 根据书源id
   bookChapters(id) {
    return fly.get(`/atoc/${id}?view=chapters`)
  },
   //9.书籍章节 根据id
   bookChaptersBookId(book_id) {
    return fly.get(`/mix-atoc/${book_id}?view=chapters`)
  },
     //10.章节内容
     chapterContent(link) {
      return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
    },
      //11.搜索热词
      hotWord() {
        return fly.get(`/book/hot-word`)
      },
     //12.书籍搜索
     bookSearch(content) {
    return fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
  },
      //13.排名分类
      rankCategory() {
        return fly.get(`/ranking/gender`)
      },
       //14.排名详情
       rankInfo(rank_id) {
        return fly.get(`/ranking/${rank_id}`)
      },
       //15.讨论
       discussions(book_id) {
        return fly.get(`/post/by-book?book=${book_id}`)
      },
         //16.短评
         shortReviews(book_id) {
          return fly.get(`/post/short-review?book=${book_id}&total=true&sortType=newest`)
        },
         //17.长评
          shortReviewss(book_id) {
            return fly.get(`/post/review/by-book?book=${book_id}`)
          },
          //18.书单id
          detail(book_id) {
            return fly.get(`/book-list/${book_id}`)
          },
}