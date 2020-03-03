import Vue from 'vue'
const getCateListTree = (res) => {
  if(res.data!=null){
    res.data.forEach(item => {
      delete item.children;
    });
    let map = {};
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    res.data.forEach(item => {
      map[item.id] = item;
    });
    let val = [];
    res.data.forEach(item => {
      Vue.set(item, 'title', item.name);
      // 以当前遍历项，的pid,去map对象中找到索引的id
      let parent = map[item.parentId];
      // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
      }
    });
    return val;
  }
  return null;
}
export default getCateListTree;
