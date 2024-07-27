import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { RolesGuard } from './guard/role.guard';
import { RoleThrottlerGuard } from './guard/throttler.guard';
import { AdminModule } from './user/admin/admin.module';
import { ClassModule } from './info/class/class.module';
import { CollegeModule } from './info/college/college.module';
import { CourseModule } from './info/course/course.module';
import { EnrollmentModule } from './info/enrollment/enrollment.module';
import { LocationModule } from './info/location/location.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './user/student/student.module';
import { TeacherModule } from './user/teacher/teacher.module';

// 总模块 - 控制所有API
@Module({
  imports: [
    AdminModule,
    AuthModule,
    UserModule,
    StudentModule,
    TeacherModule,
    ClassModule,
    CollegeModule,
    CourseModule,
    EnrollmentModule,
    LocationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleThrottlerGuard,
    },
    Logger,
  ],
})
export class MasterModule {}
