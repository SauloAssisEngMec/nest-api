import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionsService,
  ) {}

  create(createRouteDto: CreateRouteDto) {
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      this.directionsService.getDirections(
        createRouteDto.source_id,
        createRouteDto.destination_id,
      );
    this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: '',
          location: {
            lat: 0,
            lng: 0,
          },
        },
        destination: {
          name: '',
          location: {
            lat: 0,
            lng: 0,
          },
        },
        duration: 0,
        distance: 0,
        directions: {},
      },
    });
    return 'This action adds a new route';
  }

  findAll() {
    return `This action returns all routes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
