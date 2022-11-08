from cmath import inf
from queue import PriorityQueue
from typing import Dict
import math
import json

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Vertex
from .serializers import VertexSerializer

# Create your views here.
@api_view(['GET','POST'])
def give_directions(request):
    
    # print(request)
    # print(request.POST)
    # print(request.GET)
    print(request.data)

    params = json.loads(request.data['params'])

    print(params)

    friends_present = params.get("friends_present")
    stops_present = params.get("stops_present")
    src = params.get("src")
    dest = params.get("dest")
    stops = params.get("stops")
    friends = params.get("friends")
    print(src,dest)

    if(friends_present==1):
        try:
            paths: list[tuple[int, list[Vertex]]] = find_optimal_spot(friends)
        except VertexDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        data = {"paths":[]}
        for d,path in paths:
            serializer = VertexSerializer(path, many = True)
            path_data = {"dist":d,"path":serializer.data}
            data["paths"].append(path_data)

    elif(stops_present==1):
        try:
            (d,path) = dijkstra(src,dest)
        except VertexDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = VertexSerializer(path, many = True)
        data = {"dist":d,"path":serializer.data}
    else:
        try:
            (d,path)= dijkstra(src,dest)
        except VertexDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        print(d,path)
        serializer = VertexSerializer(path, many = True)
        d=0
        data = {"dist":d,"path":serializer.data}

    return Response(data=data)

def find_optimal_spot(friends: list[str])-> list[tuple[int, list[Vertex]]]:
    try:
        f_list = [get_vertex(f) for f in friends]
    except:
        raise VertexDoesNotExist

    all_vertices = Vertex.objects.all()
    final_dist = {}
    dummy_vertex = Vertex()

    for f in f_list:
        
        visited = {}
        dist = {}
        parent = {}
        
        for v in all_vertices:
            visited[v] = 0
            dist[v] = inf
            parent[v] = dummy_vertex
        
        visited[f] = 1
        dist[f] = 0
        pq = PriorityQueue()
        
        neigh = [n for n in f.neighbors.all()]
        for n in neigh:
            pq.put([math.sqrt((f.x - n.x)**2 + (f.y - n.y)**2), f, n])

        while (pq.empty() == 0):
            
            p = pq.get()
            
            if (visited[p[2]] == 0):
                
                visited[p[2]] = 1
                dist[p[2]] = p[0]
                parent[p[2]] = p[1]
                
                neigh = [n for n in p[2].neighbors.all()]
                for q in neigh:
                    pq.put([math.sqrt((p[2].x - q.x)**2 + (p[2].y - q.y)**2) + p[0], p[2], q])

        for v in all_vertices:
            final_dist[v] = final_dist[v] + dist[v]

    min_dist = min(final_dist.values())
    result =  [ver for ver in final_dist if final_dist[ver] == min_dist]
    optimum_point = result[0]

    path_list = []
    for f in list:
        (a, b) = dijkstra(f, optimum_point)
        path_list.append(b)
    
    return ((optimum_point.x, optimum_point.y), path_list)

def dijkstra_with_stops(src: str, stops: list[str], dest: str)-> tuple[int, list[Vertex]]:
    try:
        x = get_vertex(src)
        y = get_vertex(dest)
        stops = [get_vertex(s) for s in stops]
        stops = [x,stops,y]
    except:
        raise VertexDoesNotExist

    final_path = []
    final_dist = 0
    
    for i in range(len(stops)-1):
        
        (p, q) = dijkstra(stops[i], stops[i+1])
        final_dist = final_dist + p
        final_path = final_path + q[:-1]

    final_path = final_path + stops[len(stops)-1]

    return (final_dist, final_path)

def dijkstra(src: str, dest: str)-> tuple[int, list[Vertex]]:
    print(src,dest)
    try:
        x = get_vertex(src)
        y = get_vertex(dest)
    except:
        print("fuck u")
        raise VertexDoesNotExist

    all_vertices = Vertex.objects.all()

    visited = {}
    dist = {}
    parent = {}

    dummy_vertex = Vertex()

    for v in all_vertices:
        visited[v] = 0
        dist[v] = inf
        parent[v] = dummy_vertex

    visited[x] = 1
    dist[x] = 0
    pq = PriorityQueue()

    neigh = [n for n in x.neighbors.all()]
    for n in neigh:
        pq.put([math.sqrt((x.x - n.x)**2 + (x.y - n.y)**2), x, n])

    while (pq.empty() == 0):
        
        p = pq.get()
        
        if (visited[p[2]] == 0):
            
            visited[p[2]] = 1
            dist[p[2]] = p[0]
            parent[p[2]] = p[1]
            
            neigh = [n for n in p[2].neighbors.all()]
            for q in neigh:
                pq.put([math.sqrt((p[2].x - q.x)**2 + (p[2].y - q.y)**2) + p[0], p[2], q])

    path = []
    temp = y
    while (parent[temp] != dummy_vertex):
        path.append(temp)
        temp = parent[temp]
    path.append(x)
    path.reverse()

    ans = []
    for v in path:
        ans.append((v.x, v.y))
    
    return (dist[y], path)

def get_vertex(name: str)-> Vertex:
    if(name[0]=='@'):
        print("f u",name[1:])
        [x,y] = [float(k) for k in name[1:].split(',')]
        print(x,y)
        v = find_closest_vertex(x,y)
    else:
        v = Vertex.objects.get(name=name)
    return v

def find_closest_vertex(x: int,y: int) -> Vertex:
    all_vertices = Vertex.objects.all()
    dist = inf
    print(x,y,dist)
    for v in all_vertices:
        if (math.sqrt((v.x-x)**2 + (v.y-y)**2) < dist):
            dist = math.sqrt((v.x-x)**2 + (v.y-y)**2)
            ver = v
    print(ver)
    return ver

@api_view(['GET'])
def search(request, name):
    vertices = Vertex.objects.all()
    matches = []
    for v in vertices:
        if v.name in name:
            matches.append(v)
    serializer = VertexSerializer(matches, many = True)
    data = {"matches":serializer.data}

    return Response(data=data)

@api_view(['GET'])
def send_data(request):
    vertices = Vertex.objects.all()
    edges = []
    for v in vertices:
        for n in v.neighbors.all():
            edges.append({
                        "x0":v.x,
                        "y0":v.y,
                        "x1":n.x,
                        "y1":n.y,
                        "n0":v.name,
                        "n1":n.name})
    serializer = VertexSerializer(vertices, many = True)
    data = {"vertices":serializer.data,"edges":edges}
    return Response(data=data)


class VertexDoesNotExist(Exception):
    """Raised when Vertex matching query is not present in the Database"""
    pass
