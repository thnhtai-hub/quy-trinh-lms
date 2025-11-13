import type { Step } from './types';

export const WORKFLOW_DATA: Step[] = [
  {
    id: 1,
    title: 'Giáo viên',
    subtitle: 'Soạn bài giảng, bài học, bài tập',
    subSteps: [
      {
        id: '1.1',
        title: 'Soạn thảo nội dung giảng dạy',
        actor: 'Giáo viên',
        benefits: [
          'Tạo bài học và bài giảng một cách nhanh chóng, dễ dàng.',
          'Lựa chọn học liệu có sẵn từ kho tài nguyên hoặc tự động tạo mới bằng công nghệ AI.',
          'Học liệu được tinh chỉnh chuyên biệt, phù hợp cho từng khối lớp và môn học.'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Giáo viên',
    subtitle: 'Giao bài học, bài tập đến học sinh',
    subSteps: [
      {
        id: '2.1',
        title: 'Phân phối bài tập và tài liệu',
        actor: 'Giáo viên',
        benefits: [
          'Giao bài tập và học liệu cho toàn bộ lớp học hoặc cá nhân hóa cho từng học sinh chỉ với vài thao tác đơn giản.'
        ],
        why: [
          'Đảm bảo học sinh nhận được nhiệm vụ học tập một cách rõ ràng, đầy đủ và kịp thời.',
          'Tạo điều kiện để học sinh áp dụng kiến thức đã học vào thực hành, củng cố bài giảng.'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Học sinh',
    subtitle: 'Học bài, làm bài',
    subSteps: [
      {
        id: '3.1',
        title: 'Tiếp thu kiến thức và hoàn thành bài tập',
        actor: 'Học sinh',
        why: [
            'Chủ động củng cố kiến thức đã được học trên lớp.',
            'Phát triển kỹ năng tự học, tự nghiên cứu và giải quyết vấn đề một cách hiệu quả.'
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Giáo viên',
    subtitle: 'Xem tình hình học và làm bài của học sinh',
    subSteps: [
      {
        id: '4.1',
        title: 'Theo dõi tiến độ học tập',
        actor: 'Giáo viên',
        benefits: [
          'Quản lý tập trung danh sách học sinh và theo dõi toàn diện tiến độ học tập: từ số lượng bài tập đã giao đến tình trạng hoàn thành học liệu của từng em.'
        ],
        why: [
            'Dễ dàng nắm bắt điểm mạnh, điểm yếu và các khó khăn trong học tập của từng học sinh.',
            'Từ đó, đưa ra các phương pháp can thiệp và hỗ trợ kịp thời cho những em học sinh cần giúp đỡ.'
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Giáo viên',
    subtitle: 'Giao bài kiểm tra đánh giá thường xuyên',
    subSteps: [
      {
        id: '5.1',
        title: 'Tổ chức kiểm tra định kỳ',
        actor: 'Giáo viên',
        benefits: [
          'Tận dụng sức mạnh của kiểm tra số hóa để tạo và phân phối bài đánh giá một cách linh hoạt, giúp tiết kiệm đáng kể thời gian và công sức.',
          'Hỗ trợ đa dạng các hình thức câu hỏi, cho phép xây dựng những bài kiểm tra phù hợp với từng mục tiêu đánh giá cụ thể.'
        ],
        why: [
            'Kiểm tra, đánh giá chính xác mức độ hiểu bài và khả năng vận dụng kiến thức của học sinh.'
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Học sinh',
    subtitle: 'Thực hiện bài kiểm tra',
    subSteps: [
      {
        id: '6.1',
        title: 'Hoàn thành bài kiểm tra',
        actor: 'Học sinh',
        benefits: [
          'Tham gia các bài kiểm tra trực tuyến một cách linh hoạt, mọi lúc, mọi nơi và trên nhiều loại thiết bị.',
          'Nhận kết quả và phản hồi nhanh chóng sau khi hoàn thành.'
        ],
        why: [
            'Cơ hội để thể hiện năng lực và kiến thức đã tích lũy được sau một quá trình học tập.',
            'Kết quả kiểm tra là cơ sở quan trọng để đánh giá năng lực học tập một cách công bằng và khách quan.'
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Giáo viên',
    subtitle: 'Xem tình hình nộp bài, đánh giá, chấm điểm',
    subSteps: [
      {
        id: '7.1',
        title: 'Chấm bài và cho điểm',
        actor: 'Giáo viên',
        benefits: [
          'Theo dõi tập trung tình trạng nộp bài của cả lớp và sử dụng công cụ AI hỗ trợ chấm điểm, giúp giảm tải đáng kể công việc cho giáo viên.'
        ],
        why: [
            'Hệ thống hóa quy trình chấm điểm, đảm bảo tính công bằng và khách quan trong đánh giá.',
            'Gửi phản hồi chi tiết và kịp thời về bài làm, giúp học sinh nhận ra lỗi sai và tiến bộ hơn.'
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Học sinh',
    subtitle: 'Nhận kết quả học tập',
    subSteps: [
      {
        id: '8.1',
        title: 'Xem điểm số và nhận xét',
        actor: 'Học sinh',
        why: [
            'Nắm được kết quả cho những nỗ lực của bản thân trong suốt quá trình học tập.',
            'Rút kinh nghiệm từ các lỗi sai, từ đó cải thiện kết quả trong những bài kiểm tra kế tiếp.'
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'Phụ huynh',
    subtitle: 'Xem kết quả học tập của con bằng app hoccungai',
    subSteps: [
      {
        id: '9.1',
        title: 'Theo dõi kết quả qua ứng dụng',
        actor: 'Phụ huynh',
        why: [
            'Chủ động nắm bắt tình hình học tập của con em mình một cách nhanh chóng và tiện lợi.',
            'Dễ dàng phối hợp với nhà trường và giáo viên để đồng hành, hỗ trợ con học tập hiệu quả hơn.'
        ],
        notes: [
            'Sử dụng ứng dụng "hoccungai" để theo dõi và quản lý việc học của con em.'
        ]
      }
    ]
  }
];