<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskRequest;
use App\Repositories\TaskRepository;
use App\Helpers\ApiResponse;

class TaskController extends Controller
{
    protected $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index()
    {
        try {
            $tasks = $this->taskRepository->getAll();
            count($tasks) > 0 ? $message = 'Tasks retrieved successfully' : $message = 'No tasks found';
            return ApiResponse::succes_response($message, $tasks);
        } catch (\Exception $e) {
            return ApiResponse::error_response('Failed to retrieve tasks', $e->getMessage());
        }
    }

    public function store(StoreTaskRequest $request)
    {
        try {
            $task = $this->taskRepository->create($request->all());
            return ApiResponse::succes_response('Task created successfully', $task, 201);
        } catch (\Exception $e) {
            return ApiResponse::error_response('Failed to create task', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $task = $this->taskRepository->find($id);
            !is_null($task) ? $message = 'Task retrieved successfully' : $message = 'Task not found';
            return ApiResponse::succes_response($message, $task);
        } catch (\Exception $e) {
            return ApiResponse::error_response('Failed to retrieve task', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'status' => 'required|in:pending,completed',
            ]);

            $task = $this->taskRepository->update($id, $request->all());
            return ApiResponse::succes_response('Task updated successfully', $task);
        } catch (\Exception $e) {
            return ApiResponse::error_response('Failed to update task', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $taskDelete = $this->taskRepository->delete($id);
            !is_null($taskDelete) ? $message = 'Task deleted successfully' : $message = 'Task not found';
            return ApiResponse::succes_response($message, null);
        } catch (\Exception $e) {
            return ApiResponse::error_response('Failed to delete task', $e->getMessage());
        }
    }
}
