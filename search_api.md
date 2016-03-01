# 数据结构
## widget
  id:
  title:
  search_id:

## search
 id:
 name:
 create_timestamp:
 last_timestamp:
 query:
 start_datetime:
 end_datetime:
 config:

## dashboard
  name:
  desc:
  is_fav:
  created_at:
  updated_at:
  layout: //json 数组


# widget CRUD
URI : /api/0/wiget
## 获取widget
返回：

> [{
  'id':
  'title':
  'search_id':
}]

## 新增widget
请求：
METHOD: POST

>{
  ‘id’:
  'title':
  'search_id':
}

## 删除widget
请求：
METHOD: DELETE
>{
  ‘id’:
}

## 更新
请求：
METHOD: PUT
{
  ‘id’:
  'title':
  'search_id':
}

# search CRUD操作
URI : /api/0/search

## 获取search
method : GET
返回：
> {
  'id':
  'name':
  'create_timestamp':
  'last_timestamp':
  'query':

  time_range:{
    mode:'absolute',
    value:{
      from:xxx,
      to:'xxxxx'
    }
  },
  time_rangee:{
    mode:'relation',
    value:11111111
  }
  'config':
}

## 新增search
method: POST
请求：
> {
  'id':
  'name':
  'query':
  'start_datetime':
  'end_datetime':
  'config':
}


## 更新search
method: PUT
> {
  'id':
  'name':
  'query':
  'start_datetime':
  'end_datetime':
  'config':
}

## 删除search
method: DELETE

> {
  'id'
}

# Dashboard CRUD操作

## 获取dashboard 列表
URI: /api/0/dashboard
METHOD: GET
REQUEST.BODY = NULL

返回
>[{		'name': data.name,
		'desc': data.desc,
		'is_fav': true/false,
		'created_at':xxxxxx,
		'updated_at':xxxxxxx,
		'layout': [
			{
			  widget_id:'xxx',
			  position:xxxxx,
			},
			{
			  widget_id:'xxx',
			  position:xxxxx,
			}
		],
		'widgets': {
			// 此表需要读 widget 的表，将id为上面layout内的都取下来即可
			'widget_id': {
			  'id':
			  'query':
			  'title':
			  // 此处可能还需要其他字段，肯定需要，具体的待定
			}
		}
	}]


## 更新dashboard
请求：

method: PUT
>  {
  	'id': 'idxxxxxx',// 需要更改的dashboard id
  	'name': data.name,
  	'desc': data.desc,
  	'is_fav': true/false,
  	'layout': [
  		{
  		  widget_id:'xxx',
  		  position:xxxxx,
  		},
  		{
  		  widget_id:'xxx',
  		  position:xxxxx,
  		}
  	],
  }

## 新增dashboard
请求：

METHOD: POST
>  {
  	'name': data.name,
  	'desc': data.desc,
  	'is_fav': false
  }

## 删除dashboard
请求：
METHOD: DELETE

  {
    'id':
  }

# INDEXES CRUD 操作
URI: /api/0/indexes/<index_id>
## 获取inex列表
METHOD: GET
返回：
> [{
index_id
index_type
index_name
}]

## 获取


## 更新INDEX
URI: /api/0/indexes/<index_id>
请求：
> {
  index_type:
  index_name:
}

## 创建INDEX
URI: /api/0/indexes
请求：
  >
# 数据查询接口
## 查询表达式(布尔表达式)
search: 布尔表达式
filter: 布尔表达式
sort: 字段名|升序/降序
group :
  by: 字段1, 字段2, ...
  agg: ['field1', 'agg_fun1'], ....

search:

## 分页
result:
{
  page:{
    page_total:11111,
    page_no:1, //
    page_size:50
  },
  result:[
    ... ,
    {
      _raw:'xxxxxxxx'
    },
    ... ,
  ]
}
