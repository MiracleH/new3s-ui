<template>
  <ns-defect-handal
    :defectInfoList="defectInfoList"
    :defectTypeList="defectTypeList"
    :defectImageInfo="defectImageInfo"
    @delete="deleteH"
    @add="addH"
    @edit="editH"
  ></ns-defect-handal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const defectTypeList = [
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-23 15:49:26",
    updateBy: "",
    updateTime: null,
    remark: "",
    params: {},
    defectId: 16,
    parentId: 11,
    defectType: "热斑",
    defectDes: "普通热斑",
    defectLevel: "1",
    markColor: "rgb(230, 74, 25)",
    processOpinion: "",
    editHotkey: "1",
    keyCode: "49",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:46:53",
    updateBy: "",
    updateTime: null,
    remark: "",
    params: {},
    defectId: 18,
    parentId: 11,
    defectType: "热斑",
    defectDes: "聚集性热斑",
    defectLevel: "1",
    markColor: "rgb(2, 150, 136)",
    processOpinion: "",
    editHotkey: "Q",
    keyCode: "81",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:47:27",
    updateBy: "",
    updateTime: null,
    remark: "",
    params: {},
    defectId: 19,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "组件碎裂",
    defectLevel: "1",
    markColor: "rgb(66, 165, 246)",
    processOpinion: "",
    editHotkey: "W",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:47:56",
    updateBy: "",
    updateTime: null,
    remark: "",
    params: {},
    defectId: 20,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "组件功率低",
    defectLevel: "1",
    markColor: "rgb(128, 203, 196)",
    processOpinion: "",
    editHotkey: "E",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:48:12",
    updateBy: "",
    updateTime: null,
    remark: "",
    params: {},
    defectId: 21,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "组件连接缺失",
    defectLevel: "1",
    markColor: "rgb(165, 214, 167)",
    processOpinion: "",
    editHotkey: "R",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:48:43",
    updateBy: "",
    updateTime: null,
    remark: "",
    params: {},
    defectId: 22,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "组串开路",
    defectLevel: "1",
    markColor: "rgb(131, 198, 131)",
    processOpinion: "",
    editHotkey: "T",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:49:01",
    updateBy: "",
    updateTime: null,
    remark: "",
    params: {},
    defectId: 23,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "短路识别",
    defectLevel: "1",
    markColor: "rgb(200, 230, 202)",
    processOpinion: "",
    editHotkey: "Y",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:49:18",
    updateBy: "",
    updateTime: null,
    remark: "",
    params: {},
    defectId: 24,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "空载",
    defectLevel: "1",
    markColor: "rgb(144, 202, 248)",
    processOpinion: "",
    editHotkey: "U",
    keyCode: "",
    defectStyle: "P",
  },
];
const defectInfoList = ref<any>();
setTimeout(() => {
  defectInfoList.value = [
    {
      defectId: 1,
      defectTypeId: 16,
      defectName: null,
      defectColor: "rgb(230, 74, 25)",
      editHotkey: null,
      defectType: "热斑",
      defectDes: "普通热斑",
      defectBox: '{"x":100,"y":120,"w":150,"h":60}',
    },
    {
      defectId: 2,
      defectTypeId: 18,
      defectName: null,
      defectColor: "rgb(2, 150, 136)",
      editHotkey: null,
      defectType: "热斑",
      defectDes: "聚集性热斑",
      defectBox: '{"x":220,"y":120,"w":150,"h":60}',
    },
    {
      defectId: 12,
      defectTypeId: 16,
      defectName: null,
      defectColor: "rgb(230, 74, 25)",
      editHotkey: null,
      defectType: "热斑",
      defectDes: "普通热斑",
      defectBox:
        '{"w":19.857464618280837,"h":12.868524557098196,"x":24.60550643762396,"y":46.9380441725216}',
    },
  ];
}, 1000);
const deleteH = (value: number) => {
  console.log(value);
};

const addH = (value: any) => {
  console.log(value);
};

const editH = (value: any) => {
  console.log(value);
};

const defectImageInfo = reactive({
  imageUrl: "",
  infraredImageUrl: "",
});
onMounted(() => {
  defectImageInfo.imageUrl =
    "https://uploadfile.huiyi8.com/2014/0517/20140517044630954.jpg";
});
</script>
<style lang="less" scoped></style>
