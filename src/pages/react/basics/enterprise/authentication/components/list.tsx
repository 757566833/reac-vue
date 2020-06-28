import React from 'react';
import Tablelist from '@/components/tablelist';
import { useTableListHooks } from '@/components/tablelist/components/hooks';
import { getFbsMechanisms, IFbsMechanismsResponse, IFbsMechanismsParms } from '@/services/fbs';

import Authority from '@/components/authority';
import { Divider } from 'antd';
import Link from '@/components/link';
import { ISearchField } from '@/components/tablelist/components/search';

import { ITbaleListColumns } from '@/components/tablelist/components/table';
const opeartion = (_val: any, record: any) => {
  return (
    <>
      <Authority authority='pc-op-enterprise-cert-check'>
        <Link
          to={`/baseData/InstitutionalManager2/detail?id=${record.id}&type=inner`}
        >
          详情
        </Link>
        <Divider type="vertical" />
      </Authority>
      <Authority authority='pc-op-enterprise-cert-edit'>
        <Link to={`/baseData/InstitutionalManager2/edit?id=${record.id}`}>
          编辑
        </Link>
        <Divider type="vertical" />
      </Authority>
      <Authority authority='pc-op-enterprise-cert-contract-setting'>
        <Link
          to={`/baseData/InstitutionalManager2/config?id=${record.id}`}
        >
          合同服务配置
        </Link>
      </Authority>
    </>
  );
};
const columns : ITbaleListColumns<any> = [
  {
    title: '机构编号',
    dataIndex: 'globalId',
  },
  {
    title: '机构名称',
    dataIndex: 'companyName',
  },
  {
    title: '统一社会信用代码',
    dataIndex: 'unifiedSocialCreditCode',
  },
  {
    title: '认证状态',
    dataIndex: 'companyVerifiedStatus',
    // render: (val, record, index) =>
    //   (val && CertificationStatusEnum[val]) || '-',
  },
  {
    title: '授权状态',
    dataIndex: 'autoSignAuthorizeStatus',
    // render: (val, record, index) => (val && AuthorizeStatusEnum[val]) || '-',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    // render: (val, record, index) =>
    //   (val && moment(val).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
  {
    title: '操作',
    dataIndex: 'operator',
    render: opeartion,
  },
];
const searchFields:ISearchField[] = [{
  item: 'input',
  key: 'companyName',
  label: '机构名称',
  props: { maxLength: 20 },
}, {
  item: 'input',
  key: 'unifiedSocialCreditCode',
  label: '统一社会信用代码',
  props: { maxLength: 20 },
}, {
  item: 'rangepicker',
  key: ['createTimeBegin', 'createTimeEnd'],
  label: '创建日期',
}, {
  item: 'input',
  key: 'companyVerifiedStatus',
  label: '认证状态',
}, {
  item: 'input',
  key: 'autoSignAuthorizeStatus',
  label: '授权状态',
}];
const List: React.FC= () => {
  const hook = useTableListHooks<IFbsMechanismsParms, IFbsMechanismsResponse>({ searchFunc: getFbsMechanisms });
  console.log('刷新');
  return (
    <Tablelist
      searchFields={searchFields}
      columns={columns}
      {...hook}
    />

  );
};
export default List;
