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
    :defectImageNumber="{ targetNumber: 10, totalNumber: 20 }"
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
    createTime: "2022-11-28 11:49:12",
    updateBy: "admin",
    updateTime: "2023-08-16 16:01:53",
    remark: "算法识别的缺陷类型",
    params: {},
    defectId: 27,
    parentId: 26,
    defectType: "红外",
    defectDes: "热斑",
    defectLevel: "1",
    markColor: "rgb(31, 135, 232)",
    processOpinion: "现场核查，请定期清理更换",
    editHotkey: "Z",
    keyCode: "90",
    algoKey: "HS",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-11-28 11:50:22",
    updateBy: "admin",
    updateTime: "2023-08-16 16:02:12",
    remark: "算法识别的缺陷类型",
    params: {},
    defectId: 28,
    parentId: 26,
    defectType: "红外",
    defectDes: "二极管故障",
    defectLevel: "2",
    markColor: "rgb(240, 148, 0)",
    processOpinion: "硬件故障风险，请检查更换",
    editHotkey: "X",
    keyCode: "88",
    algoKey: "DDF",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-11-28 11:50:57",
    updateBy: "admin",
    updateTime: "2023-08-16 16:02:22",
    remark: "算法识别的缺陷类型",
    params: {},
    defectId: 29,
    parentId: 26,
    defectType: "红外",
    defectDes: "遮挡",
    defectLevel: "1",
    markColor: "rgb(255, 0, 0)",
    processOpinion: "异物遮挡，请定期清理!",
    editHotkey: "C",
    keyCode: "67",
    algoKey: "RZD",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-11-28 11:52:03",
    updateBy: "admin",
    updateTime: "2023-08-16 16:02:32",
    remark: "算法识别的缺陷类型",
    params: {},
    defectId: 30,
    parentId: 25,
    defectType: "可见光",
    defectDes: "鸟屎",
    defectLevel: "1",
    markColor: "rgb(184, 61, 20)",
    processOpinion: "异物遮挡，请定期清理!",
    editHotkey: "V",
    keyCode: "86",
    algoKey: "NS",
    defectStyle: "P",
  },
  {
    searchValue: null,
    createBy: "admin",
    createTime: "2022-11-28 11:53:08",
    updateBy: "admin",
    updateTime: "2023-08-16 16:02:36",
    remark: "算法识别的缺陷类型",
    params: {},
    defectId: 31,
    parentId: 25,
    defectType: "可见光",
    defectDes: "遮挡",
    defectLevel: "1",
    markColor: "rgb(235, 65, 101)",
    processOpinion: "异物遮挡，请定期清理!",
    editHotkey: "B",
    keyCode: "66",
    algoKey: "VZD",
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
      defectId: 14,
      defectClass: "1",
      defectTypeId: 27,
      defectName: null,
      defectColor: "rgb(31, 135, 232)",
      editHotkey: null,
      defectType: "红外",
      defectDes: "热斑",
      defectBox: '{"h":122,"w":144,"x":885,"y":3816}',
      defectIfBox: '{"h":16,"w":19,"x":176,"y":558}',
      longitude: "E119°45′32.62″",
      latitude: "N41°16′34.56″",
      locationDesc: "朝阳光伏-3.2-004-1-004-1",
    },
    {
      defectId: 15,
      defectClass: "1",
      defectTypeId: 29,
      defectName: null,
      defectColor: "rgb(255, 0, 0)",
      editHotkey: null,
      defectType: "红外",
      defectDes: "遮挡",
      defectBox: '{"h":122,"w":144,"x":885,"y":3816}',
      defectIfBox: '{"h":16,"w":19,"x":176,"y":558}',
      longitude: "E119°45′32.62″",
      latitude: "N41°16′34.56″",
      locationDesc: "朝阳光伏-3.2-004-1-004-1",
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
    "http://192.168.5.188:9000/pvinspection/DJI_20230802103208_0084_T.JPG";
  defectImageInfo.infraredImageUrl =
    "http://192.168.5.188:9000/pvinspection/20240409_1712646197_753.JPG";
});
</script>
<style lang="less" scoped></style>
