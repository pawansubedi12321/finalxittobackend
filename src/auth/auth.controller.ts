import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor ,UseInterceptors, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt_auth.guards';
import { RolesGuard } from './guards/role_guard';
import { HasRoles } from 'src/core/decorators/has-role.decorator';
import { Role } from 'src/utils/enum/role.enum';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from './dto/change.password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
    ) {}


  @Post('/login')
  @ResponseMessage('User logged in successfully')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }

  @Get('with-token')
  @ResponseMessage("User login successfully")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.USER, Role.WORKER, Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  loginWithiToken(@Req() req : any) {
    // return req.user.id;
    return this.usersService.findOne(req.user.id);
  }

  @Post("change-password")
  @ResponseMessage("Password changed successfully")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  chnagePassword(@Body() changePwDto : ChangePasswordDto, @Req() req : any) {
    // return 'changePwDto';
    // return req.user.id;
    return this.authService.changePassword(changePwDto,req.user.id );
  }


  
  @Post('/test')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HasRoles(Role.ADMIN)
  @ResponseMessage('User logged in successfully')
  @UseInterceptors(ClassSerializerInterceptor)
  test(){
    return "Test Case";
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
