<template>
  <ns-defect-handal
    :defectInfoList="defectInfoList"
    :defectTypeList="defectTypeList"
    :defectImageInfo="defectImageInfo"
    :defectDetailList="defectDetailList"
    :defectHighLight="defectHighLight"
    :showToolLayer="true"
    :sysColor="'#3377FF'"
    :defectListStyle="{ detailHeight: '400px', infoHeight: '370px' }"
    @delete="deleteH"
    @add="addH"
    @edit="editH"
    @detail="detailH"
  ></ns-defect-handal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const defectTypeList = [
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-23 15:49:26",
    updateBy: "admin",
    updateTime: "2022-09-14 15:15:02",
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
    updateBy: "admin",
    updateTime: "2022-09-14 15:14:53",
    remark: "",
    params: {},
    defectId: 18,
    parentId: 11,
    defectType: "热斑",
    defectDes: "聚集性热斑",
    defectLevel: "2",
    markColor: "rgb(31, 135, 232)",
    processOpinion: "",
    editHotkey: "q",
    keyCode: "81",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:47:27",
    updateBy: "admin",
    updateTime: "2022-09-14 15:14:45",
    remark: "",
    params: {},
    defectId: 19,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "组件碎裂",
    defectLevel: "1",
    markColor: "rgb(255, 183, 78)",
    processOpinion: "",
    editHotkey: "W",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:47:56",
    updateBy: "admin",
    updateTime: "2022-09-14 15:14:37",
    remark: "",
    params: {},
    defectId: 20,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "组件功率低",
    defectLevel: "2",
    markColor: "rgb(38, 165, 154)",
    processOpinion: "",
    editHotkey: "E",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:48:12",
    updateBy: "admin",
    updateTime: "2022-09-14 15:14:29",
    remark: "",
    params: {},
    defectId: 21,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "组件连接缺失",
    defectLevel: "3",
    markColor: "rgb(216, 27, 67)",
    processOpinion: "",
    editHotkey: "R",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:48:43",
    updateBy: "admin",
    updateTime: "2022-09-14 15:14:22",
    remark: "",
    params: {},
    defectId: 22,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "组串开路",
    defectLevel: "3",
    markColor: "rgb(235, 29, 78)",
    processOpinion: "",
    editHotkey: "T",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:49:01",
    updateBy: "admin",
    updateTime: "2022-09-14 15:14:15",
    remark: "",
    params: {},
    defectId: 23,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "短路识别",
    defectLevel: "4",
    markColor: "rgb(230, 74, 25)",
    processOpinion: "",
    editHotkey: "Y",
    keyCode: "",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-08-29 10:49:18",
    updateBy: "admin",
    updateTime: "2022-09-14 15:14:04",
    remark: "",
    params: {},
    defectId: 24,
    parentId: 12,
    defectType: "组件本体",
    defectDes: "空载",
    defectLevel: "4",
    markColor: "rgb(216, 27, 67)",
    processOpinion: "",
    editHotkey: "U",
    keyCode: "",
    defectStyle: "P",
  },
];
const defectInfoList = ref<any>();
const defectDetailList = [
  {
    label: "故障定位:",
    value: "123.32132333, 321.32222222",
  },
  {
    label: "位置描述:",
    value: "1232132132",
  },
  {
    label: "缺陷种类:",
    value: 12,
  },
];
const defectHighLight = null;
setTimeout(() => {
  defectInfoList.value = [
    {
      defectId: 31,
      defectTypeId: 16,
      defectName: null,
      defectColor: "rgb(230, 74, 25)",
      editHotkey: null,
      defectType: "热斑",
      defectDes: "普通热斑",
      defectBox:
        '{"w":192.2248243559719,"h":252.9274004683842,"x":1483.9408665105384,"y":1175.1007025761123}',
      longitude: "116.75418033333334",
      latitude: "43.08216977777778",
      locationDesc: null,
    },
    {
      defectId: 34,
      defectTypeId: 18,
      defectName: null,
      defectColor: "rgb(31, 135, 232)",
      editHotkey: null,
      defectType: "热斑",
      defectDes: "聚集性热斑",
      defectBox:
        '{"w":672.7868852459017,"h":419.8594847775175,"x":629.0462529274002,"y":638.8946135831383}',
      longitude: "116.75392316666667",
      latitude: "43.082314333333336",
      locationDesc: null,
    },
    {
      defectId: 35,
      defectTypeId: 20,
      defectName: null,
      defectColor: "rgb(38, 165, 154)",
      editHotkey: null,
      defectType: "组件本体",
      defectDes: "组件功率低",
      defectBox:
        '{"w":515.9718969555036,"h":435.0351288056206,"x":2308.4841920374706,"y":896.88056206089}',
      longitude: "116.75453683333333",
      latitude: "43.08231355555556",
      locationDesc: null,
    },
    {
      defectId: 36,
      defectTypeId: 20,
      defectName: null,
      defectColor: "rgb(38, 165, 154)",
      editHotkey: null,
      defectType: "组件本体",
      defectDes: "组件功率低",
      defectBox:
        '{"w":515.9718969555036,"h":435.0351288056206,"x":2308.4841920374706,"y":896.88056206089}',
      longitude: "116.75590458333333",
      latitude: "43.082314027777784",
      locationDesc: null,
    },
    {
      defectId: 37,
      defectTypeId: 16,
      defectName: null,
      defectColor: "rgb(230, 74, 25)",
      editHotkey: null,
      defectType: "热斑",
      defectDes: "普通热斑",
      defectBox:
        '{"w":718.3138173302108,"h":738.5480093676815,"x":1782.3951990632318,"y":735.0070257611242}',
      longitude: "116.75711225",
      latitude: "43.08231441666667",
      locationDesc: null,
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

const detailH = (value: number) => {
  console.log(value);
};

const defectImageInfo = reactive({
  imageUrl: "",
  infraredImageUrl: "",
});
onMounted(() => {
  defectImageInfo.imageUrl =
    "http://192.168.5.188:9000/pvinspection/DJI_20220827120742_0153_Z.JPG";
  defectImageInfo.infraredImageUrl =
    "http://192.168.5.188:9000/pvinspection/20220920_1663668380_184.JPG";
});
</script>
<style lang="less" scoped></style>
